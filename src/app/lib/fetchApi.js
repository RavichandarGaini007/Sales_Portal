
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken
} from './authToken';

// ✅ USE ENVIRONMENT VARIABLE
export const API_REQUEST = process.env.REACT_APP_API_URL || "https://alkemcrm.com/salesapi/api/Sales/";

// 🔁 PREVENT INFINITE TOKEN REFRESH LOOPS
let isRefreshing = false;
let refreshPromise = null;
let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 3;

export const refreshAccessToken = async () => {
  try {
    refreshAttempts++;
    
    // ✅ SAFETY CHECK: Don't retry more than MAX attempts
    if (refreshAttempts > MAX_REFRESH_ATTEMPTS) {
      console.warn('Max token refresh attempts reached');
      return false;
    }

    const response = await fetch(`${API_REQUEST}refresh`, {
      method: 'POST',
      credentials: 'include' // ✅ sends refresh cookie
    });

    if (!response.ok) {
      console.warn('Token refresh failed with status:', response.status);
      return false;
    }

    const data = await response.json();
    const refreshedToken = data.accessToken || data.token;
    if (!refreshedToken) {
      console.warn('No access token in refresh response');
      return false;
    }

    setAccessToken(refreshedToken);
    refreshAttempts = 0; // Reset on success
    return true;
  } catch (err) {
    console.error('Refresh token failed:', err);
    return false;
  }
};


export const fetchApi = async (url, payload = {}, config = {}) => {
  // ✅ PREVENT INFINITE RETRIES
  const retryCount = config._retryCount || 0;
  const MAX_RETRIES = 1; // Only retry once

  const token = getAccessToken();
  
  // ✅ SUPPORT ABORT SIGNAL FOR CANCELLATION
  const fetchConfig = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(config.headers || {})
    },
    body: JSON.stringify(payload),
    credentials: 'include'
  };

  // Add abort signal if provided (for cancelling requests)
  if (config.signal) {
    fetchConfig.signal = config.signal;
  }

  let response;
  try {
    response = await fetch(url, fetchConfig);
  } catch (error) {
    // Handle abort errors gracefully
    if (error.name === 'AbortError') {
      console.warn('Request was cancelled');
      throw error;
    }
    throw error;
  }

  // ✅ SUCCESS
  if (response.status !== 401) {
    return response.json();
  }

  // ❌ ALREADY RETRIED
  if (retryCount >= MAX_RETRIES) {
    clearAccessToken();
    window.location.href = '/sales_portal/login';
    throw new Error('Authentication failed: Session expired');
  }

  // 🔁 ACCESS TOKEN EXPIRED - TRY REFRESH
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = refreshAccessToken();
  }

  const refreshed = await refreshPromise;
  isRefreshing = false;

  if (!refreshed) {
    clearAccessToken();
    window.location.href = '/sales_portal/login';
    throw new Error('Session expired');
  }

  // 🔄 RETRY ORIGINAL REQUEST (ONCE)
  return fetchApi(url, payload, { ...config, _retryCount: retryCount + 1 });
};

export const fetchApiGet = async (url, config = {}) => {
  // ✅ PREVENT INFINITE RETRIES
  const retryCount = config._retryCount || 0;
  const MAX_RETRIES = 1;

  const token = getAccessToken();
  
  // ✅ SUPPORT ABORT SIGNAL FOR CANCELLATION
  const fetchConfig = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(config.headers || {})
    },
    credentials: 'include'
  };

  // Add abort signal if provided (for cancelling requests)
  if (config.signal) {
    fetchConfig.signal = config.signal;
  }

  let response;
  try {
    response = await fetch(url, fetchConfig);
  } catch (error) {
    // Handle abort errors gracefully
    if (error.name === 'AbortError') {
      console.warn('Request was cancelled');
      throw error;
    }
    throw error;
  }

  if (response.status !== 401) {
    return response.json();
  }

  // ❌ ALREADY RETRIED
  if (retryCount >= MAX_RETRIES) {
    clearAccessToken();
    window.location.href = '/sales_portal/login';
    throw new Error('Authentication failed: Session expired');
  }

  // 🔁 ACCESS TOKEN EXPIRED - TRY REFRESH
  const refreshed = await refreshAccessToken();

  if (!refreshed) {
    clearAccessToken();
    window.location.href = '/sales_portal/login';
    throw new Error('Session expired');
  }

  // 🔄 RETRY ORIGINAL REQUEST (ONCE)
  return fetchApiGet(url, { ...config, _retryCount: retryCount + 1 });
};


export const apiUrls = {
  salesdata: API_REQUEST + 'salesdata',
  salesAchvdata: API_REQUEST + 'salesAchvdata',
  SalesScData: API_REQUEST + 'SalesScData',
  SalesTopPerformance: API_REQUEST + 'SalesTopPerformance',
  SalesHierarchyDesg: API_REQUEST + 'SalesHierarchyDesg',
  SalesDivHQ: API_REQUEST + 'SalesDivHQ',
  BrandPerfmnceData: API_REQUEST + 'BrandPerfmnceData',
  DivHqReportData: API_REQUEST + 'DivHqReportData',
  DivBrandReportData: API_REQUEST + 'DivBrandReportData',
  DivPlantReportData: API_REQUEST + 'DivPlantReportData',
  DivCustReportData: API_REQUEST + 'DivCustReportData',
  RegionReportData: API_REQUEST + 'RegionReportData',
  ProductReportData: API_REQUEST + 'ProductReportData',
  DashboardMenus: API_REQUEST + 'getDashboardMenus',
  GetBrandCodeData: API_REQUEST + 'GetBrandCodeFromFlatFile',
  GetFlatFileDataPrimary: API_REQUEST + 'GetFlatFilePrimarySales',
  SalesDiv: API_REQUEST + 'SalesDiv',
  userEmailId: API_REQUEST + 'userEmailId',
  DownloadFileFromFTP: API_REQUEST + 'download',
  GetCustomizeTabUser: API_REQUEST + 'GetCustomize_tab_user',
  GetFtpFileLastModifiedDateTime: API_REQUEST + 'GetFtpFileLastModifiedDateTime',
  GetEncryptAndEncodeVal: API_REQUEST + 'GetEncryptAndEncodeVal',
  GetDecryptAndEncodeVal: API_REQUEST + 'GetDecryptAndEncodeVal',
  GetDesGetDesgEmp: API_REQUEST + 'GetDesGetDesgEmp',
  NetworkWiseProductSale_S: API_REQUEST + 'NetworkWiseProductSale_S',
  groupDivData: API_REQUEST + 'groupDivData',
  NetworkWiseProductYearlySale: API_REQUEST + 'NetworkWiseProductYearlySale',
  getHierarchyWiseValueWiseReport: API_REQUEST + 'getHierarchyWiseValueWiseReport',
  custSalesTrendReport: API_REQUEST + 'custSalesTrendReport',
  custSalesProductTrendReport: API_REQUEST + 'custSalesProductTrendReport',
  corpPerformanceReport: API_REQUEST + 'corpPerformanceReport',
  glanceReport: API_REQUEST + 'GlanceReport',
  dispensaryReport: API_REQUEST + 'DispensaryReport',
};

export const popState = {
  popHqWise: 'hqWise',
  popDivWise: 'divWise',
  popBrandWise: 'brandWise',
  popHierarchyWise: 'hierarchyWise',
  popPlantWise: 'plantWise',
  popCustWise: 'custWise',
  popRegionWise: 'regionwise',
  popProductWise: 'productwise',
};


//
// const secretKey = 'superSecretKey@345'; // Same secret key used to sign the token

// // Middleware to validate the JWT token
// export function authenticateToken(req, res, next) {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).send('Access Denied: No Token Provided');
//   }

//   try {
//     // Verify the token
//     jwt.verify(token, secretKey, (err, user) => {
//       if (err) {
//         return res.status(403).send('Access Denied: Invalid or Expired Token');
//       }

//       // Attach the user data to the request object
//       req.user = user;
//       next();  // Continue with the request
//     });
//   } catch (error) {
//     return res.status(500).send('Server Error');
//   }
// }

// // Use the middleware to protect routes
// app.get('/protectedRoute', authenticateToken, (req, res) => {
//   res.send(`Welcome, ${req.user.username}!`);
// });
