import { ContractDetail } from "./contract.type";

interface ResidentBase {
    id: string;
    fullname: string;
    citizenId: string;
    phone: string;
    status: string;
    devices: Device[];
}

export interface Resident extends ResidentBase { }

export interface ResidentDetail extends ResidentBase {
    phone: string;
    email: string;
    address: string;
    dateOfBirth: string;
    gender: string;
    citizenId: string;
    contract: ContractDetail[];
    dateJoin: string;
    devices: Device[];
}

export interface Device {
    token: string;
}

interface ResidentCreateUpdateBase {
    phone: string;
    email: string;
    fullName: string;
    password?: string;
    address: string;
    dateOfBirth: string;
    citizenId: string;
    gender: string;
}

export interface CreateResidentRequest extends ResidentCreateUpdateBase { }

export interface UpdateResidentRequest extends ResidentCreateUpdateBase {
    id: string;
}