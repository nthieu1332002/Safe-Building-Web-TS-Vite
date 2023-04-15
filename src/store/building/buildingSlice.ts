import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import buildingAPI from "../../config/api/building/buildingAPI.js"
import { Building, CreateBuildingRequest } from "../../types/building.type";
import { FlatList } from "../../types/flatList.type";
import { Search } from "../../types/search.type.js";

const { getBuildingFilterAPI, createBuildingAPI, getFlatListByBuildingIdAPI } = buildingAPI;

interface BuildingState {
    buildings: Building[],
    buildingList: Building[],
    flatList: FlatList[],
    loading: boolean,
    error?: string,
    page: number,
    size: number,
    totalPage: number,
    searchKey: string,
    sortBy: string,
    order: string,
}

const initialState: BuildingState = {
    buildings: [],
    buildingList: [],
    flatList: [],
    loading: false,
    error: '',
    page: 1,
    size: 10,
    totalPage: 0,
    searchKey: '',
    sortBy: '',
    order: '',
}

const buildingSlice = createSlice({
    name: "building",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getBuilding.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBuilding.fulfilled, (state, action) => {
                state.buildings = action.payload.res.data.data
                state.page = action.payload.res.data.pagination.page
                state.totalPage = action.payload.res.data.pagination.totalPage
                state.searchKey = action.payload.data.searchKey
                state.sortBy = action.payload.data.sortBy
                state.order = action.payload.data.order
                state.loading = false
            })
            .addCase(getBuilding.rejected, (state, action) => {
                state.buildings = []
                state.error = action.error.message
                state.loading = false
            })
            .addCase(getAllBuilding.fulfilled, (state, action) => {
                state.buildingList = action.payload.data.data
            })
            .addCase(createBuilding.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBuilding.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(createBuilding.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(getFlatByBuilding.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getFlatByBuilding.fulfilled, (state, action) => {
                state.flatList = action.payload.data.data
                state.loading = false;

            })
            .addCase(getFlatByBuilding.rejected, (state, action) => {
                state.flatList = []
                state.loading = false;

            })
    }
})

export const getBuilding = createAsyncThunk(
    "building/getBuilding",
    async (data: Search, { rejectWithValue }) => {
        try {
            const res = await getBuildingFilterAPI(data);
            const response = {
                data, res
            }
            return response;
        } catch (err: any) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const getAllBuilding = createAsyncThunk(
    "building/getAllBuilding",
    async (data: Search, { rejectWithValue }) => {
        try {
            const res = await getBuildingFilterAPI(data);
            return res;
        } catch (err: any) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export const createBuilding = createAsyncThunk(
    "building/createBuilding",
    async (data: CreateBuildingRequest, { rejectWithValue }) => {
        try {
            const res = await createBuildingAPI(data);
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

export const getFlatByBuilding = createAsyncThunk(
    "building/getFlatByBuilding",
    async (data: string, { rejectWithValue }) => {
        try {
            const res = await getFlatListByBuildingIdAPI(data);
            return res;
        } catch (err: any) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export default buildingSlice