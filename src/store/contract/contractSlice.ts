import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import contractAPI from "../../config/api/contract/contractAPI";
import { IContract, ICreateContractRequest } from "../../types/contract.type"
import { ISearch } from "../../types/search.type"
const { getContractAPI, postContractAPI, deleteContractAPI } = contractAPI;

interface ContractState {
    contracts: IContract[];
    loading: boolean;
    error?: string;
    page: number;
    size: number;
    totalPage: number;
    searchKey: string;
    sortBy: string;
    order: string;
}

const initialState: ContractState = {
    contracts: [],
    loading: false,
    error: '',
    page: 1,
    size: 10,
    totalPage: 0,
    searchKey: '',
    sortBy: '',
    order: '',
};

const contractSlice = createSlice({
    name: "contract",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getContract.pending, (state) => {
                state.loading = true;
            })
            .addCase(getContract.fulfilled, (state, action) => {
                state.loading = false
                state.contracts = action.payload.data.data
                state.page = action.payload.data.pagination.page
                state.totalPage = action.payload.data.pagination.totalPage
            })
            .addCase(getContract.rejected, (state, action) => {
                state.loading = false
                state.contracts = []
                state.error = action.error.message
            })
            .addCase(postContract.pending, (state) => {
                state.loading = true;
            })
            .addCase(postContract.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(postContract.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const getContract = createAsyncThunk(
    "contract/getContract",
    async (data: ISearch, { rejectWithValue }) => {
        try {
            const res = await getContractAPI(data);
            return res;
        } catch (err: any) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);


export const postContract = createAsyncThunk(
    "contract/postContract",
    async (data: ICreateContractRequest, { rejectWithValue }) => {
        try {
            const res = await postContractAPI(data);
            if (res.status === 201) {
                toast.success(res.data.message)
                return res
            }
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }
);

export const deleteContractById = createAsyncThunk(
    "contract/deleteContractById",
    async (data: { id: string }, { rejectWithValue }) => {
        try {
            const res = await deleteContractAPI(data);
            if (res.status === 200) {
                toast.success(res.data.message)
            }
        } catch (err: any) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

export default contractSlice