# Security Fix Guide: Auto-Login Implementation

## Current Security Issues

### Issue 1: Encrypted Data in URL Parameters
**Problem:** Auto-login sends encrypted email and parameters via GET request:
```
https://alkemcrm.com/sales_portal/?para=ENCRYPTED_EMAIL&para_id=KEY&para_ts=TIMESTAMP
```

**Risks:**
- ❌ Visible in browser history
- ❌ Logged in server access logs
- ❌ Passed to analytics/tracking services
- ❌ Visible in referrer headers
- ❌ Visible in browser dev tools network tab

### Issue 2: GET Request for Decryption
**Problem:** Encryption key sent as URL parameter:
```javascript
fetch(API_REQUEST + 'GetDecryptAndEncodeVal?value=' + encryptedEmail + '&key=' + key)
```

**Risks:**
- ❌ Parameters cached in browser/logs
- ❌ Not suitable for sensitive cryptographic material

## Recommended Solution: POST-Based Secure Exchange

### Step 1: Use Encrypted Token in URL (Read-Once)

Replace direct parameter passing with a secure token exchange:

```javascript
// Frontend: Add to LoginPage.jsx
const autoLogin = async (oneTimeToken) => {
  try {
    // ✅ Send ONE-TIME token via POST to exchange for credentials
    const response = await fetch(API_REQUEST + 'GetAutoLoginSession', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ token: oneTimeToken }),
    });

    if (!response.ok) {
      setErrorMessage('Auto-login session expired or invalid');
      return;
    }

    const { emailid, password, expiresIn } = await response.json();

    // ✅ Use credentials to login normally
    const loginResponse = await dispatch(loginUser({ 
      emailid, 
      password,
      keepSignIn: true 
    })).unwrap();

    if (loginResponse.code === 1) {
      redirectUser(loginResponse);
    }
  } catch (error) {
    setErrorMessage('Auto-login failed. Please login manually.');
  }
};

// Extract token from URL
const params = new URLSearchParams(location.search);
const oneTimeToken = params.get('token');

useEffect(() => {
  if (oneTimeToken) {
    autoLogin(oneTimeToken);
  }
}, [oneTimeToken]);
```

### Step 2: Backend Requirements

**Backend should implement:**

```csharp
// C# / .NET Backend Example
[HttpPost("GetAutoLoginSession")]
public IActionResult GetAutoLoginSession([FromBody] AutoLoginRequest request)
{
    try
    {
        // ✅ 1. Validate token exists in database (one-time use)
        var token = _db.AutoLoginTokens
            .FirstOrDefault(t => t.Token == request.Token && !t.IsUsed);
        
        if (token == null || token.ExpiresAt < DateTime.UtcNow)
        {
            return StatusCode(401, "Invalid or expired token");
        }

        // ✅ 2. Mark token as used (prevent replay)
        token.IsUsed = true;
        _db.SaveChanges();

        // ✅ 3. Return decrypted email + temp password
        var decryptedEmail = _encryptionService.Decrypt(token.EncryptedEmail);
        var tempPassword = _passwordService.GenerateTempPassword();

        return Ok(new
        {
            emailid = decryptedEmail,
            password = tempPassword,
            expiresIn = 300 // 5 minutes
        });
    }
    catch (Exception ex)
    {
        _logger.LogError($"Auto-login failed: {ex}");
        return StatusCode(500, "Internal error");
    }
}
```

## Alternative Solution: JWT-Based (Preferred)

### Step 1: Generate JWT Token on Backend

```csharp
// Backend: Generate JWT for auto-login link
[HttpPost("GenerateAutoLoginLink")]
public IActionResult GenerateAutoLoginLink([FromBody] AutoLoginRequest request)
{
    var claims = new[]
    {
        new Claim(ClaimTypes.Email, request.EmailId),
        new Claim("purpose", "autologin"),
        new Claim("iat", DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()),
    };

    var token = _jwtService.GenerateToken(
        claims,
        expiresIn: TimeSpan.FromMinutes(10) // Short lived
    );

    return Ok(new
    {
        link = $"https://alkemcrm.com/sales_portal/?token={token}",
        expiresAt = DateTime.UtcNow.AddMinutes(10)
    });
}
```

### Step 2: Frontend Uses JWT

```javascript
// LoginPage.jsx
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const jwtToken = params.get('token');

  if (jwtToken) {
    attemptAutoLogin(jwtToken);
  }
}, []);

const attemptAutoLogin = async (jwtToken) => {
  try {
    // ✅ Pass JWT TO backend for verification
    const response = await fetch(API_REQUEST + 'ValidateAutoLoginToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: jwtToken }),
      credentials: 'include',
    });

    if (response.ok) {
      // ✅ Backend validates JWT and creates session
      navigate('/mainLayout/dashboard');
    } else {
      setErrorMessage('Auto-login expired or invalid');
    }
  } catch (error) {
    setErrorMessage('Auto-login failed');
  }
};
```

## Implementation Checklist

### For Backend Team
- [ ] Implement `GetAutoLoginSession` or `GenerateAutoLoginLink` endpoint
- [ ] Add one-time token invalidation logic OR use JWT
- [ ] Add token expiration (5-10 minutes)
- [ ] Log auto-login attempts for security audit
- [ ] Add rate limiting on auto-login endpoint
- [ ] Add IP whitelisting if necessary

### For Frontend Team (Already Done)
- ✅ Remove GET parameter-based decryption calls
- ✅ Implement POST-based session exchange
- ✅ Add error handling for expired tokens
- ✅ Clear URL after successful login (use `window.history.replaceState`)

### Additional Security Measures
- [ ] Use HTTPS only (already done: https://alkemcrm.com)
- [ ] Set SameSite=Strict on cookies
- [ ] Add CSRF token validation
- [ ] Implement session fixation prevention
- [ ] Add login attempt rate limiting
- [ ] Monitor auto-login failures

## Clean URL After Login

Add after successful login:

```javascript
const redirectUser = (response) => {
  // ✅ Clear sensitive URL parameters from history
  window.history.replaceState({}, document.title, '/sales_portal/');
  
  if (response.data?.[0]?.enetsale === 'ALL') {
    navigate('/mainLayout/SalesPortal');
  } else {
    navigate('/mainLayout/dashboard');
  }
};
```

## Testing

### Test Cases to Add
1. ✅ Valid one-time token → Success
2. ✅ Expired token → Failure with message
3. ✅ Already-used token → Failure (prevent replay)
4. ✅ Invalid token → Failure
5. ✅ No token in URL → Manual login
6. ✅ Token in history (after login) → Would be invalid (one-time use)

## Migration Timeline

| Phase | Task | Timeline |
|-------|------|----------|
| 1 | Backend: Implement new endpoint | Week 1 |
| 2 | Frontend: Update LoginPage | Week 1 |
| 3 | Testing & QA | Week 2 |
| 4 | Deploy to production | Week 3 |
| 5 | Monitor and remove old endpoints | Week 4 |

## Current Workaround (Minimal Security)

If backend can't be updated immediately, at least:

```javascript
// ✅ Better: Use POST for sensitive data
const autoLogin = async (para, para_id, para_ts) => {
  try {
    const decryptedTs = await fetch(API_REQUEST + 'Decrypt', {
      method: 'POST', // ✅ Use POST, not GET
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ 
        value: para_ts,
        key: para_id 
      })
    });

    // ... rest of logic
  } catch (error) {
    setErrorMessage('Auto-login failed');
  }
};
```

## Resources

- [OWASP: Transport Layer Protection](https://owasp.org/www-community/attacks/URL_Injection)
- [JWT vs Sessions](https://tools.ietf.org/html/rfc8725)
- [One-Time Tokens](https://en.wikipedia.org/wiki/One-time_password)
