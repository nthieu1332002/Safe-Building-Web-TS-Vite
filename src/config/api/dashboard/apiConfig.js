import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import store from "../../../store/store";
import { logout } from "../../../store/user/userSlice";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  // config.headers.Authorization
  const token = Cookies.get('userToken')
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { dispatch } = store;
    if (error?.response?.status === 403) {
      dispatch(logout())
    }
    return Promise.reject(error);
  }
);

export default api;
