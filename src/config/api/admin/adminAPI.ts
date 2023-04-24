import { Search } from "../../../types/search.type";
import api from "./apiConfig";

// sample: 

const adminAPI = {
    getAdminAccountAPI: ({ page, size }: Search) => {
        const url =`/admins/accounts?page=${page}&size=${size}`;
        return api.get(url)
    },
}

export default adminAPI