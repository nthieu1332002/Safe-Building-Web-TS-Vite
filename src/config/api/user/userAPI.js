import api from "./apiConfig";

// sample: 

const userAPI = {
    loginAPI: (data) => {
        const url = `/auth/login`;

        const body = {
            ...data,
        };
        return api.post(url, body);
    }
}

export default userAPI