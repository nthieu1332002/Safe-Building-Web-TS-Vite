export interface Building {
    id: string;
    name: string;
    address: string;
    capacity: number;
    status: string;
}

export interface CreateBuildingRequest {
    name: string,
    address: string,
    status: string,
    capacity: number
}