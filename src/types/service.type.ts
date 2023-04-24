export interface Service {
    id: string;
    name: string;
    price: number;
    icon: string;
    status: string;
}

export interface CreateServiceRequest {
    icon: File;
    requestObject: string;
}