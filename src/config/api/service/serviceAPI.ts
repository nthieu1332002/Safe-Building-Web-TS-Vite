import { Search } from "../../../types/search.type";
import { CreateServiceRequest } from "../../../types/service.type";
import api from "./apiConfig";

// sample: 

const serviceAPI = {
    getServiceAPI: ({page, size, searchKey, sortBy, order }: Search) => {
        const url = `/services?page=${page}&size=${size}&searchKey=${searchKey}&sortBy=${sortBy}&order=${order}`;
        return api.get(url)
    },
    createServiceAPI: (data: CreateServiceRequest) => {
        const url = `/services/create`;
        const body = {
            ...data,
        };
        return api.post(url, body);
    },
}

export default serviceAPI