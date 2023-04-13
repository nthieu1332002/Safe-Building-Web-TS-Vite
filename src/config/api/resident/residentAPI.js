import api from "./apiConfig";

const residentAPI = {
    getResidentAPI: ({ page, size, searchKey, sortBy, order }) => {
        const url = `/customers/filter?page=${page}&size=${size}&searchKey=${searchKey}&sortBy=${sortBy}&order=${order}`;
        return api.get(url)
    },
    createResidentAccountAPI: (data) => {
        const url = `/customers/create-customer`;
        const body = {
            ...data,
        };
        return api.post(url, body);
    },
    getResidentAccountByIdAPI: ({id}) => {
        const url = `/customers/${id}`;
        return api.get(url)
    },
    updateResidentAccountAPI: (data) => {
        const url = `/customers/update-customer`;
        const body = {
            ...data,
        };
        return api.put(url, body);
    }
}

export default residentAPI