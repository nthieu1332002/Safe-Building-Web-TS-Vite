import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import dashboardAPI from "../../config/api/dashboard/dashboardAPI.js"
import { DashBoard } from "../../types/dashboard.type.js";
const { getContractByYearAPI, getRevenueByYearAPI, getServicesByMonthYearAPI } = dashboardAPI;

interface DashboardState {
    contractList: DashBoard[],
    contractYear: number,
    contractLoading: boolean,
    revenueList: DashBoard[],
    revenueYear: number,
    revenueLoading: boolean,
    serviceList: DashBoard[],
    serviceMonth: number,
    serviceYear: number,
    serviceLoading: boolean,
}

const initialState: DashboardState = {
    contractList: [],
    contractYear: 2023,
    contractLoading: true,
    revenueList: [],
    revenueYear: 2023,
    revenueLoading: true,
    serviceList: [],
    serviceMonth: 1,
    serviceYear: 2023,
    serviceLoading: false,
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        changeContractYear(state, action) {
            state.contractYear = action.payload
        },
        changeRevenueYear(state, action) {
            state.revenueYear = action.payload
        },
        changeServiceYear(state, action) {
            state.serviceYear = action.payload
        },
        changeServiceMonth(state, action) {
            state.serviceMonth = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getContractByYear.pending, (state, action) => {
                state.contractLoading = true;
            })
            .addCase(getContractByYear.fulfilled, (state, action) => {
                state.contractList = action.payload.data.data
                state.contractLoading = false;
            })
            .addCase(getContractByYear.rejected, (state, action) => {
                state.contractList = []
                state.contractLoading = false;
            })
            .addCase(getRevenueByYear.pending, (state, action) => {
                state.revenueLoading = true;
            })
            .addCase(getRevenueByYear.fulfilled, (state, action) => {
                state.revenueList = action.payload.data.data
                state.revenueLoading = false;
            })
            .addCase(getRevenueByYear.rejected, (state, action) => {
                state.revenueList = []
                state.revenueLoading = false;
            })
            .addCase(getServiceByMonthYear.pending, (state, action) => {
                state.serviceLoading = true;
            })
            .addCase(getServiceByMonthYear.fulfilled, (state, action) => {
                state.serviceList = action.payload.data.data
                state.serviceLoading = false;
            })
            .addCase(getServiceByMonthYear.rejected, (state, action) => {
                state.serviceList = []
                state.serviceLoading = false;
            })
    }
})

export const getContractByYear = createAsyncThunk(
    "dashboard/getContractByYear",
    async (data: { year: number }, { rejectWithValue }) => {
        try {
            const res = await getContractByYearAPI(data);
            return res
        } catch (err: any) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);
export const getRevenueByYear = createAsyncThunk(
    "dashboard/getRevenueByYear",
    async (data: { year: number }, { rejectWithValue }) => {
        try {
            const res = await getRevenueByYearAPI(data);
            return res
        } catch (err: any) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const getServiceByMonthYear = createAsyncThunk(
    "dashboard/getServiceByMonthYear",
    async (data: { month: number, year: number }, { rejectWithValue }) => {
        try {
            const res = await getServicesByMonthYearAPI(data);
            return res
        } catch (err: any) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const { changeRevenueYear, changeContractYear, changeServiceMonth, changeServiceYear } = dashboardSlice.actions
export default dashboardSlice