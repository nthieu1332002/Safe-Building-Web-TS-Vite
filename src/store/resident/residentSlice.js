import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import residentAPI from "../../config/api/resident/residentAPI"
import { toast } from "react-toastify";
const { getResidentAPI, createResidentAccountAPI, getResidentAccountByIdAPI, updateResidentAccountAPI } = residentAPI;


const residentSlice = createSlice({
    name: "resident",
    initialState: {
        residents: [],
        residentDetail: {},
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
    async (data, { rejectWithValue }) => {
        try {
            const res = await getResidentAPI(data);
            return res;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const createResident = createAsyncThunk(
    "resident/createResident",
    async (data, { rejectWithValue }) => {
        try {
            const res = await createResidentAccountAPI(data);
            if (res.status === 201) {
                toast.success(res.data.message)
                return res
            }
        } catch (err) {
            console.log("err", err);
            return rejectWithValue(err.response.data)
        }
    }
);

export const getResidentById = createAsyncThunk(
    "resident/getResidentById",
    async (data, { rejectWithValue }) => {
        try {
            const res = await getResidentAccountByIdAPI(data);
            console.log("res", res);
            return res;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const updateResident = createAsyncThunk(
    "resident/updateResident",
    async (data, { rejectWithValue }) => {
        try {
            const res = await updateResidentAccountAPI(data);
            if (res.status === 201) {
                toast.success(res.data.message)
                return res
            }
        } catch (err) {
            console.log("err", err);
            return rejectWithValue(err.response.data)
        }
    }
);

export default residentSlice