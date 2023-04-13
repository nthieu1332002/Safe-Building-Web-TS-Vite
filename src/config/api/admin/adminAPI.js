import api from "./apiConfig";

// sample: 

const adminAPI = {
    getAdminAccountAPI: ({ page, size }) => {
        const url =`/admins/accounts?page=${page}&size=${size}`;
        return api.get(url)
    },
}

export default adminAPI