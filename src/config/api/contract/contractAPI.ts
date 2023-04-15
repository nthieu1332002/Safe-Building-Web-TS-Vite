import api from "./apiConfig";
import { Search } from "../../../types/search.type"
// sample: 

const contractAPI = {
    getContractAPI: ({ page, size, searchKey, sortBy, order }: Search) => {
        const url = `/rent-contracts?page=${page}&size=${size}&searchKey=${searchKey}&sortBy=${sortBy}&order=${order}`;
        return api.get(url)
    },
    postContractAPI: (data) => {
        const url = `/rent-contracts/create-contract`;
        const body = {
            ...data
        }
        return api.post(url, body);
    },
    getContractByIdAPI: ({ id }) => {
        const url = `/rent-contracts/${id}`;
        return api.get(url)
    },
    editContractAPI: (data) => {
        const url = `/rent-contracts/edit-contract`;
        const body = {
            ...data
        }
        return api.put(url, body);
    },
    deleteContractAPI: ({ id }: { id: string }) => {
        const url = `/rent-contracts/delete-contract/${id}`;
        return api.delete(url)
    }
}

export default contractAPI