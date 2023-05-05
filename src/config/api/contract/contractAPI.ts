import api from "./apiConfig";
import { ISearch } from "../../../types/search.type"
import { ICreateContractRequest } from "../../../types/contract.type";
// sample: 

const contractAPI = {
    getContractAPI: ({ page, size, searchKey, sortBy, order }: ISearch) => {
        const url = `/rent-contracts?page=${page}&size=${size}&searchKey=${searchKey}&sortBy=${sortBy}&order=${order}`;
        return api.get(url)
    },
    postContractAPI: (data: ICreateContractRequest) => {
        const url = `/rent-contracts/create-contract`;
        const body = {
            ...data
        }
        return api.post(url, body);
    },
    getContractByIdAPI: ({ id }: {id: string}) => {
        const url = `/rent-contracts/${id}`;
        return api.get(url)
    },
    deleteContractAPI: ({ id }: { id: string }) => {
        const url = `/rent-contracts/delete-contract/${id}`;
        return api.delete(url)
    }
}

export default contractAPI