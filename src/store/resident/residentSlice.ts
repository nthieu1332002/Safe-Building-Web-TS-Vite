import { ICreateResidentRequest, IResident, IResidentDetail, IUpdateResidentRequest } from './../../types/resident.type';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import residentAPI from "../../config/api/resident/residentAPI"
import { toast } from "react-toastify";

import { ISearch } from "../../types/search.type";
const { getResidentAPI, createResidentAccountAPI, getResidentAccountByIdAPI, updateResidentAccountAPI } = residentAPI;

interface ResidentState {
    residents: IResident[];
    residentDetail: IResidentDetail | null;
    loading: boolean;
    error?: string;
    page: number,
    size: number,
    totalPage: number,
    searchKey: string,
    sortBy: string,
    order: string,
}

const initialState: ResidentState = {
    residents: [],
    residentDetail: null,
    loading: false,
    error: '',
    page: 1,
    size: 10,
    totalPage: 0,
    searchKey: '',
    sortBy: '',
    order: '',
}

const residentSlice = createSlice({
    name: "resident",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getResident.pending, (state) => {
                state.loading = true;
            })
            .addCase(getResident.fulfilled, (state, action) => {
                state.loading = false
                state.residents = action.payload.data.data
                state.page = action.payload.data.pagination.page
                state.totalPage = action.payload.data.pagination.totalPage
            })
            .addCase(getResident.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(createResident.pending, (state) => {
                state.loading = true;
            })
            .addCase(createResident.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(createResident.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(getResidentById.fulfilled, (state, action) => {
                state.residentDetail = action.payload.data.data
            })
            .addCase(updateResident.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateResident.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(updateResident.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const getResident = createAsyncThunk(
    "resident/getResident",
    async (data: ISearch, { rejectWithValue }) => {
        try {
            const res = await getResidentAPI(data);
            return res;
        } catch (err: any) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const createResident = createAsyncThunk(
    "resident/createResident",
    async (data: ICreateResidentRequest, { rejectWithValue }) => {
        try {
            const res = await createResidentAccountAPI(data);
            if (res.status === 201) {
                toast.success(res.data.message)
                return res
            }
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }
);

export const getResidentById = createAsyncThunk(
    "resident/getResidentById",
    async (data: {id: string}, { rejectWithValue }) => {
        try {
            const res = await getResidentAccountByIdAPI(data);
            return res;
        } catch (err: any) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const updateResident = createAsyncThunk(
    "resident/updateResident",
    async (data: IUpdateResidentRequest, { rejectWithValue }) => {
        try {
            const res = await updateResidentAccountAPI(data);
            if (res.status === 201) {
                toast.success(res.data.message)
                return res
            }
        } catch (err: any) {
            console.log("err", err);
            return rejectWithValue(err.response.data)
        }
    }
);

export default residentSlice