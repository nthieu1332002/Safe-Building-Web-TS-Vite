import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import flatAPI from "../../config/api/flat/flatAPI.js"

const { getFlatAPI, createFlatAPI, getFlatTypeAPI } = flatAPI;


const flatSlice = createSlice({
    name: "flat",
    initialState: {
        flats: [],
        flatType: [],
        loading: false,
        error: '',
        page: 1,
        size: 10,
        totalPage: 0,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getFlat.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFlat.fulfilled, (state, action) => {
                state.loading = false
                state.flats = action.payload.data.data
                state.page = action.payload.data.pagination.page
                state.totalPage = action.payload.data.pagination.totalPage
            })
            .addCase(getFlat.rejected, (state, action) => {
                state.loading = false
                state.flat = []
                state.error = action.error.message
            })
            .addCase(createFlat.pending, (state) => {
                state.loading = true;
            })
            .addCase(createFlat.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(createFlat.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(getFlatType.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFlatType.fulfilled, (state, action) => {
                state.loading = false
                state.flatType = action.payload.data.data
            })
            .addCase(getFlatType.rejected, (state, action) => {
                state.loading = false
                state.flatType = []
                state.error = action.error.message
            })
    }
})

export const getFlat = createAsyncThunk(
    "flat/getFlat",
    async (data, { rejectWithValue }) => {
        try {
            const res = await getFlatAPI(data);
            return res;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);
export const createFlat = createAsyncThunk(
    "flat/createFlat",
    async (data, { rejectWithValue }) => {
        try {
            const res = await createFlatAPI(data);
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

export const getFlatType = createAsyncThunk(
    "flat/getFlatType",
    async () => {
        try {
            const res = await getFlatTypeAPI();
            return res;
        } catch (err) {
            console.log(err)

        }
    }
);

export default flatSlice