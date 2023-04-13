import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import serviceAPI from "../../config/api/service/serviceAPI"

const { getServiceAPI, createServiceAPI } = serviceAPI;


const serviceSlice = createSlice({
    name: "service",
    initialState: {
        services: [],
        loading: false,
        error: '',
        page: 1,
        size: 10,
        totalPage: 0,
        searchKey: '',
        sortBy: '',
        order: '',
    },
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
                state.service = []
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
    async (data, { rejectWithValue }) => {
        try {
            const res = await getServiceAPI(data);
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
);

export const createService = createAsyncThunk(
    "service/createService",
    async (data, { rejectWithValue }) => {
        try {
            const res = await createServiceAPI(data);
            if (res.status === 201) {
                toast.success(res.data.message)
                return res
            }
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
);



export default serviceSlice