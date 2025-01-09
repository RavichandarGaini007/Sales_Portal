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

export const apiUrls = {
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
};
