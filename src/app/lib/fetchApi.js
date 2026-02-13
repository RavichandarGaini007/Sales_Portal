
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken
  // getKeepSignIn,
  // getUserId
} from './authToken';

//export const API_REQUEST = "https://192.168.120.64/React_Login_api/api/Sales/";
export const API_REQUEST = "https://alkemcrm.com/salesapi/api/Sales/";
//export const API_REQUEST = "https://localhost:5001/api/Sales/";


let isRefreshing = false;
let refreshPromise = null;

const refreshAccessToken = async () => {
  try {
    const response = await fetch(`${API_REQUEST}refresh`, {
      method: 'POST',
      credentials: 'include' // ✅ sends refresh cookie
    });

    if (!response.ok) return false;

    const data = await response.json();
    if (!data.accessToken) return false;

    setAccessToken(data.accessToken);
    return true;
  } catch (err) {
    console.error('Refresh token failed', err);
    return false;
  }
};


export const fetchApi = async (url, payload = {}, config = {}) => {
  const token = getAccessToken();

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(config.headers || {})
    },
    body: JSON.stringify(payload),
    credentials: 'include',
    ...config
  });

  // ✅ SUCCESS
  if (response.status !== 401) {
    return response.json();
  }

  // 🔁 ACCESS TOKEN EXPIRED
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = refreshAccessToken();
  }

  const refreshed = await refreshPromise;
  isRefreshing = false;

  if (!refreshed) {
    clearAccessToken();
    window.location.href = '/sales_portal_new/login';
    //throw new Error('Session expired');
  }

  // 🔄 RETRY ORIGINAL REQUEST
  return fetchApi(url, payload, config);
};

export const fetchApiGet = async (url, config = {}) => {
  const token = getAccessToken();

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(config.headers || {})
    },
    credentials: 'include',
    ...config
  });

  if (response.status !== 401) {
    return response.json();
  }

  // 🔁 ACCESS TOKEN EXPIRED
  const refreshed = await refreshAccessToken();

  if (!refreshed) {
    clearAccessToken();
    window.location.href = '/sales_portal_new/login';
    // throw new Error('Session expired');
  }

  // 🔄 RETRY ORIGINAL REQUEST
  return fetchApiGet(url, config);
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
  GetDesGetDesgEmp: API_REQUEST + 'GetDesGetDesgEmp',
  NetworkWiseProductSale_S: API_REQUEST + 'NetworkWiseProductSale_S',
  groupDivData: API_REQUEST + 'groupDivData',
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
