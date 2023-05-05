export interface IBuilding {
    id: string;
    name: string;
    address: string;
    capacity: number;
    status: string;
}

export interface ICreateBuildingRequest {
    name: string,
    address: string,
    status: string,
    capacity: number
}