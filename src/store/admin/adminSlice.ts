import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAPI from "../../config/api/admin/adminAPI.js"
import { IAdmin } from "../../types/admin.type.js";
import { Search } from "../../types/search.type.js";

const { getAdminAccountAPI } = adminAPI;

interface AdminState {
    adminAccounts: IAdmin[],
    loading: boolean,
    error?: string,
    page: number,
    size: number,
    totalPage: number,
}

const initialState: AdminState = {
    adminAccounts: [],
    loading: false,
    error: '',
    page: 1,
    size: 10,
    totalPage: 0,
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAdminAccount.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAdminAccount.fulfilled, (state, action) => {
                state.loading = false
                state.adminAccounts = action.payload.data.data
                state.page = action.payload.data.pagination.page
                state.totalPage = action.payload.data.pagination.totalPage
            })
            .addCase(getAdminAccount.rejected, (state, action) => {
                state.loading = false
                state.adminAccounts = []
                state.error = action.error.message
            })
        
    }
})

export const getAdminAccount = createAsyncThunk(
    "admin/getAdminAccount",
    async (data: Search, { rejectWithValue }) => {
        try {
            const res = await getAdminAccountAPI(data);
            return res;
        } catch (err: any) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export default adminSlice