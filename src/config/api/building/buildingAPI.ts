import api from "./apiConfig";
import { ISearch } from "../../../types/search.type"
import { ICreateBuildingRequest } from "../../../types/building.type";

const buildingAPI = {
    getBuildingFilterAPI: ({page, size, searchKey, sortBy, order }: ISearch) => {
        const url = `/buildings/get-building-list?page=${page}&size=${size}&searchKey=${searchKey}&sortBy=${sortBy}&order=${order}`;
        return api.get(url);
    },
    createBuildingAPI: (data: ICreateBuildingRequest) => {
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