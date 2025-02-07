export const fetchApi = async (url, payload, config) => {
  return await fetch(url, {
    method: 'POST', // Specify the HTTP method as POST
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
      ...(config ? config.headers : {}),
    },
    body: JSON.stringify(payload), // Convert the body object to JSON
    ...(config ? config : {}),
  }).then((resp) => resp.json());
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

export const API_REQUEST = "http://192.168.120.64/React_Login_api/api/Sales/";

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
