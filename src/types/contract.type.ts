export interface Contract {
    id: string;
    buildingName: string;
    roomNumber: number;
    customerName: string;
    expiryDate: string;
    title: string;
    rentContractLink: string;
    status: string;
}

export interface ContractDetail {
    id: string;
    link: string;
    roomNumber: number;
    status: string;
    title: string;
    buildingName: string;
    buildAddress: string;
}

export interface CreateContractRequest {
    files: File;
    requestContract: string;
    deviceTokens: string;
}