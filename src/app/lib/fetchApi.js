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

export const apiUrls = {
  salesdata: 'https://sales.alkemcrm.com/NETCOREAPP/api/Sales/salesdata',
  salesAchvdata:
    'http://192.168.120.64/React_Login_api/api/Sales/salesAchvdata',
  SalesScData: 'http://192.168.120.64/React_Login_api/api/Sales/SalesScData',
  SalesTopPerformance:
    'http://192.168.120.64/React_Login_api/api/Sales/SalesTopPerformance',
  SalesHierarchyDesg:
    'http://192.168.120.64/React_Login_api/api/Sales/SalesHierarchyDesg',
  SalesDivHQ: 'http://192.168.120.64/React_Login_api/api/Sales/SalesDivHQ',
  BrandPerfmnceData:
    'http://192.168.120.64/React_Login_api/api/Sales/BrandPerfmnceData',  
  // DivHqReportData:
  //   'http://192.168.120.64/React_Login_api/api/Sales/DivHqReportData',
  // DivBrandReportData:
  //   'http://192.168.120.64/React_Login_api/api/Sales/DivBrandReportData',
  DivHqReportData:
    'http://localhost:5218/api/Sales/DivHqReportData',
    DivBrandReportData:
    'http://localhost:5218/api/Sales/DivBrandReportData',
};

export const popState = {
  popHqWise : 'hqWise',
  popBrandWise : 'brandWise',
  popHierarchyWise : 'hierarchyWise'
}
