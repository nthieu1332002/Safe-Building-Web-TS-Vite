import { CreateResidentRequest, UpdateResidentRequest } from "../../../types/resident.type";
import { Search } from "../../../types/search.type";
import api from "./apiConfig";

const residentAPI = {
    getResidentAPI: ({ page, size, searchKey, sortBy, order }: Search) => {
        const url = `/customers/filter?page=${page}&size=${size}&searchKey=${searchKey}&sortBy=${sortBy}&order=${order}`;
        return api.get(url)
    },
    createResidentAccountAPI: (data: CreateResidentRequest) => {
        const url = `/customers/create-customer`;
        const body = {
            ...data,
        };
        return api.post(url, body);
    },
    getResidentAccountByIdAPI: ({id}: {id: string}) => {
        const url = `/customers/${id}`;
        return api.get(url)
    },
    updateResidentAccountAPI: (data: UpdateResidentRequest) => {
        const url = `/customers/update-customer`;
        const body = {
            ...data,
        };
        return api.put(url, body);
    }
}

export default residentAPI