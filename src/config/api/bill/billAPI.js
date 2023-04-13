import api from "./apiConfig";

const billAPI = {
  getBillAPI: ({ page, size }) => {
    const url = `/bills?page=${page}&size=${size}`;
    return api.get(url);
  },
  createBillAPI: (data) => {
    const url = `/bills`;
    const body = {
      ...data,
    };
    return api.post(url, body);
  },
  getBillByIdAPI: ({ id }) => {
    const url = `/bills/${id}`;
    return api.get(url);
  },
  getFileExcelAPI: ({ buildingId }) => {
    const url = `/get-template-excel-file?buildingId=${buildingId}`;
    return api.get(url, {
      responseType: "blob",
    });
  },
  createMonthlyBillAPI: (data) => {
    const url = `/rent-contract/upload-excel-file`;
    const body = {
      ...data,
    };
    return api.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default billAPI;
