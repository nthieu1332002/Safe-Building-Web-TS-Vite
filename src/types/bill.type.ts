export interface IBill {
    id: string;
    buildingName: string;
    room_number: number;
    value: number;
    date: string;
    status: string;
}

export interface IBillDetail {
    id: string;
    serviceName: string,
    quantity: number,
    price: number,
}

export interface ICreateBillRequest {
    flatId: string;
    service: IServiceList[];
}

interface IServiceList {
    id: string;
    quantity: number;
}

export interface ICreateMonthlyBillRequest {
    uploadFile: File;
}