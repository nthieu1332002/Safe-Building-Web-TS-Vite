export interface FlatList {
    id: string;
    roomNumber: number;
    value: number;
}

export interface Flat {
    id: string;
    buildingName: string;
    roomNumber: number;
    flatType: string;
    price: number;
    status: string;
}

export interface FlatType {
    id: string;
    name: string;
}

export interface CreateFlatRequest {
    roomNumber: number;
    buildingId: string;
    price: number;
    flatTypeId: string;
    status: string;
    detail: string;
}