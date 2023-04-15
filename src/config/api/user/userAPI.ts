import api from "./apiConfig";

export interface LoginRequest {
    email?: any;
    token?: string;
    phone?: string;
    password?: string;
    withEmail: boolean;
    web: boolean;
};

const userAPI = {
    loginAPI: (data: LoginRequest) => {
        const url = `/auth/login`;

        const body = {
            ...data,
        };
        return api.post(url, body);
    }
}

export default userAPI