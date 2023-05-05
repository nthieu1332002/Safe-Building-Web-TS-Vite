import { ICreateFlatRequest } from "../../../types/flat.type";
import { ISearch } from "../../../types/search.type";
import api from "./apiConfig";

const flatAPI = {
    getFlatAPI: ({ page, size }: ISearch) => {
        const url =`/flats?page=${page}&size=${size}`;
        return api.get(url)
    },
    createFlatAPI: (data: ICreateFlatRequest) => {
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