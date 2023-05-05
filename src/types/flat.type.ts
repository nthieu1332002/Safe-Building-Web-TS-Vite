export interface IFlatList {
    id: string;
    roomNumber: number;
    value: number;
}

export interface IFlat {
    id: string;
    buildingName: string;
    roomNumber: number;
    flatType: string;
    price: number;
    status: string;
}

export interface IFlatType {
    id: string;
    name: string;
}

export interface ICreateFlatRequest {
    roomNumber: number;
    buildingId: string;
    price: number;
    flatTypeId: string;
    status: string;
    detail: string;
}