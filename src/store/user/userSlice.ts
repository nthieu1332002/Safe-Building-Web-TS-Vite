import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import userAPI, { LoginRequest } from "../../config/api/user/userAPI"
import { toast } from "react-toastify";

const { loginAPI } = userAPI;

const userToken = Cookies.get('userToken') ?? null;

const refreshToken = Cookies.get('refreshToken') ?? null;

type Users = any;

const users: Users = JSON.parse(localStorage.getItem('users') ?? 'null');

interface UserState {
    users: Users;
    userToken: string | null;
    refreshToken: string | null;
    loading: boolean;
}

const initialState: UserState = {
    users: users,
    userToken,
    refreshToken,
    loading: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            console.log("cookie remove");
            Cookies.remove("userToken");
            Cookies.remove("refreshToken");
            state.userToken = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log("action.payload", action.payload);
                Cookies.set('userToken', action.payload.data.data.tokenResponse.accessToken, { expires: 1 / 48, path: '' })
                Cookies.set('refreshToken', action.payload.data.data.tokenResponse.refreshToken, { expires: 1 / 24, path: '' })
                localStorage.setItem('users', JSON.stringify(action.payload.data.data));
                state.users = action.payload.data.data
                state.userToken = action.payload.data.data.tokenResponse.accessToken
                state.refreshToken = action.payload.data.data.tokenResponse.refreshToken
                state.loading = false
            })
            .addCase(login.rejected, (state) => {
                state.users = null
                state.loading = false
            })
    }
})

export const login = createAsyncThunk(
    "user/login",
    async (data: LoginRequest, { rejectWithValue }) => {
        console.log("data lg", data);
        try {
            const res = await loginAPI(data)
            if (res.status === 200) {
                toast.success(res.data.message)
                return res
            } else {
                toast.error(res.data.message)
                return rejectWithValue(res)
            }
        } catch (err: any) {
            toast.error("Login failed! Check your info again.")
            return rejectWithValue(err.response?.data)
        }
    }
);

export const { logout } = userSlice.actions;
export default userSlice