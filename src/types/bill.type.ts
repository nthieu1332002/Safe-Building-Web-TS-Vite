export interface Bill {
    id: string;
    buildingName: string;
    room_number: number;
    value: number;
    date: string;
    status: string;
}

export interface BillDetail {
    id: string;
    serviceName: string,
    quantity: number,
    price: number,
}

export interface CreateBillRequest {
    flatId: string;
    service: ServiceList[];
}

interface ServiceList {
    id: string;
    quantity: number;
}

export interface CreateMonthlyBillRequest {
    uploadFile: File;
}