import api from "./apiConfig";
import { Search } from "../../../types/search.type"
import { CreateBuildingRequest } from "../../../types/building.type";

const buildingAPI = {
    getBuildingFilterAPI: ({page, size, searchKey, sortBy, order }: Search) => {
        const url = `/buildings/get-building-list?page=${page}&size=${size}&searchKey=${searchKey}&sortBy=${sortBy}&order=${order}`;
        return api.get(url);
    },
    createBuildingAPI: (data: CreateBuildingRequest) => {
        const url = `/buildings/add-building`;
        const body = {
            ...data,
        };
        return api.post(url, body);
    },
    getFlatListByBuildingIdAPI: (data: string) => {
        const url = `buildings/${data}/get-flats`;
        return api.get(url);
    },
}

export default buildingAPI