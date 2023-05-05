import { IContractDetail } from "./contract.type";

interface IResidentBase {
    id: string;
    fullname: string;
    citizenId: string;
    phone: string;
    status: string;
    devices: IDevice[];
}

export interface IResident extends IResidentBase { }

export interface IResidentDetail extends IResidentBase {
    phone: string;
    email: string;
    address: string;
    dateOfBirth: string;
    gender: string;
    citizenId: string;
    contract: IContractDetail[];
    dateJoin: string;
    devices: IDevice[];
}

export interface IDevice {
    token: string;
}

interface IResidentCreateUpdateBase {
    phone: string;
    email: string;
    fullName: string;
    password?: string;
    address: string;
    dateOfBirth: string;
    citizenId: string;
    gender: string;
}

export interface ICreateResidentRequest extends IResidentCreateUpdateBase { }

export interface IUpdateResidentRequest extends IResidentCreateUpdateBase {
    id: string;
}