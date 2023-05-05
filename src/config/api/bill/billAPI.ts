import { ICreateBillRequest, ICreateMonthlyBillRequest } from "../../../types/bill.type";
import { ISearch } from "../../../types/search.type";
import api from "./apiConfig";

const billAPI = {
  getBillAPI: ({ page, size }: ISearch) => {
    const url = `/bills?page=${page}&size=${size}`;
    return api.get(url);
  },
  createBillAPI: (data: ICreateBillRequest) => {
    const url = `/bills`;
    const body = {
      ...data,
    };
    return api.post(url, body);
  },
  getBillByIdAPI: ({ id }: {id: string}) => {
    const url = `/bills/${id}`;
    return api.get(url);
  },
  getFileExcelAPI: ({ buildingId }: {buildingId: string}) => {
    const url = `/get-template-excel-file?buildingId=${buildingId}`;
    return api.get(url, {
      responseType: "blob",
    });
  },
  createMonthlyBillAPI: (data: ICreateMonthlyBillRequest) => {
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
