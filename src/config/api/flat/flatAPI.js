import api from "./apiConfig";

const flatAPI = {
    getFlatAPI: ({ page, size }) => {
        const url =`/flats?page=${page}&size=${size}`;
        return api.get(url)
    },
    createFlatAPI: (data) => {
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