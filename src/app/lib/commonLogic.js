
import { apiUrls, fetchApiGet } from './fetchApi';


export const getAchvLabelColor = (value) => {
  if (value >= 100) return "green"; // Green
  if (value >= 95 && value <= 99.99) return "yellow"; // Yellow
  return "red"; // Red
};

export async function fetchDiv(empCode) {
    if (!empCode) return [];
    const response = await fetchApiGet(`${apiUrls.SalesDiv}?strEmpCode=${empCode}`);
    return response?.data?.map((item) => ({
    label: item.name,
    value: item.div,
    })) || [];
}

export async function fetchBrands(selectedDivison, selectedYear, screencode, fieldname) {
    if (!selectedDivison?.length || !selectedYear?.length) return [];
    const divisionIds = selectedDivison.map((division) => division.value);
    const response = await fetchApiGet(
        `${apiUrls.GetBrandCodeData}?div=${divisionIds}&year=${selectedYear[0].value}&screencode=${screencode}&fieldname=${fieldname}`
    );
    return (
        response?.data?.map((item) => ({
            label: item.brand,
            value: item.brand_code,
        })) || []
    );
}
