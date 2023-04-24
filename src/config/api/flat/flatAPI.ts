import { CreateFlatRequest } from "../../../types/flat.type";
import { Search } from "../../../types/search.type";
import api from "./apiConfig";

const flatAPI = {
    getFlatAPI: ({ page, size }: Search) => {
        const url =`/flats?page=${page}&size=${size}`;
        return api.get(url)
    },
    createFlatAPI: (data: CreateFlatRequest) => {
        const url = `/flats/create-flat`;
        const body = {
            ...data,
        };
        return api.post(url, body);
    },
    getFlatTypeAPI: () => {
        const url =`/flat-types`;
        return api.get(url)
    },
}

export default flatAPI