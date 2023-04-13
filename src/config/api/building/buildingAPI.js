import api from "./apiConfig";

const buildingAPI = {
    getBuildingFilterAPI: ({page, size, searchKey, sortBy, order }) => {
        const url = `/buildings/get-building-list?page=${page}&size=${size}&searchKey=${searchKey}&sortBy=${sortBy}&order=${order}`;
        return api.get(url);
    },
    createBuildingAPI: (data) => {
        const url = `/buildings/add-building`;
        const body = {
            ...data,
        };
        return api.post(url, body);
    },
    getFlatListByBuildingIdAPI: (data) => {
        const url = `buildings/${data}/get-flats`;
        return api.get(url);
    },
}

export default buildingAPI