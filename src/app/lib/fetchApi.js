//const jwt = require('token');
import { jwtDecode } from 'jwt-decode';

export const fetchApi = async (url, payload, config) => {

  const headers = {
    'Content-Type': 'application/json',
    ...(config ? config.headers : {}),
  };

  if (!url.includes('https://alkemcrm.com/salesapi/api/User/userEmailId?user_id')) {
    const token = localStorage.getItem('token');
    // const secretKey = "superSecretKey@345";

    // if (token) {
    //   const decoded = jwtDecode(token);
    //   const currentTime = Date.now() / 1000;

    //   if (decoded.exp && decoded.exp < currentTime) {
    //     return res.status(403).send('Access Denied: Invalid or Expired Token'); // Token expired
    //   }

    //   // jwt.verify(token, secretKey, (err) => {
    //   //   if (err) {
    //   //     return res.status(403).send('Access Denied: Invalid or Expired Token');
    //   //   }
    //   // });
    // }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    method: 'POST', // Specify the HTTP method as POST
    headers: headers,
    body: JSON.stringify(payload), // Convert the body object to JSON
    ...(config ? config : {}),
  });

  if (response.status === 401 || response.status === 403) {
    // Token is invalid or expired, redirect to login
    console.error('Unauthorized or Forbidden: Token might be expired or invalid');
    // Redirect to login page (or handle token renewal)
    window.location.href = 'sales_portal_new/login'; //// Redirect to login page //LoginPage
    return;
  }

  const data = await response.json();
  return data;
};

export const fetchApiGet = async (url, config) => {
  return await fetch(url, {
    method: 'GET', // Specify the HTTP method as GET
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
      ...(config ? config.headers : {}), // Merge any additional headers from config
    },
    ...(config ? config : {}), // Merge any additional configuration options
  }).then((resp) => resp.json());
};

//export const API_REQUEST = "https://192.168.120.64/React_Login_api/api/Sales/";
export const API_REQUEST = "https://alkemcrm.com/salesapi/api/Sales/";
//export const API_REQUEST = "https://localhost:5001/api/Sales/";

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
  SalesDiv: API_REQUEST + 'SalesDiv',
  userEmailId: API_REQUEST + 'userEmailId',
};

export const popState = {
  popHqWise: 'hqWise',
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
