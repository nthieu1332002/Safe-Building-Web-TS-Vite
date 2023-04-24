import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import serviceAPI from "../../config/api/service/serviceAPI"
import { CreateServiceRequest, Service } from "../../types/service.type";
import { Search } from "../../types/search.type";

const { getServiceAPI, createServiceAPI } = serviceAPI;

interface ServiceState {
    services: Service[],
    loading: boolean,
    error?: string,
    page: number,
    size: number,
    totalPage: number,
    searchKey: string,
    sortBy: string,
    order: string,
}

const initialState: ServiceState = {
    services: [],
    loading: false,
    error: '',
    page: 1,
    size: 10,
    totalPage: 0,
    searchKey: '',
    sortBy: '',
    order: '',
}

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getService.pending, (state) => {
                state.loading = true;
            })
            .addCase(getService.fulfilled, (state, action) => {
                state.loading = false
                state.services = action.payload.data.data
                state.page = action.payload.data.pagination.page
                state.totalPage = action.payload.data.pagination.totalPage
            })
            .addCase(getService.rejected, (state, action) => {
                state.loading = false
                state.services = []
                state.error = action.error.message
            })
            .addCase(createService.pending, (state) => {
                state.loading = true;
            })
            .addCase(createService.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(createService.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const getService = createAsyncThunk(
    "service/getService",
    async (data: Search, { rejectWithValue }) => {
        try {
            const res = await getServiceAPI(data);
            return res;
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }
);

export const createService = createAsyncThunk(
    "service/createService",
    async (data: CreateServiceRequest, { rejectWithValue }) => {
        try {
            const res = await createServiceAPI(data);
            if (res.status === 201) {
                toast.success(res.data.message)
                return res
            }
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }
);



export default serviceSlice