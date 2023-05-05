export interface IService {
    id: string;
    name: string;
    price: number;
    icon: string;
    status: string;
}

export interface ICreateServiceRequest {
    icon: File;
    requestObject: string;
}