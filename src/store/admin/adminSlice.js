import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAPI from "../../config/api/admin/adminAPI.js"

const { getAdminAccountAPI } = adminAPI;


const adminSlice = createSlice({
    name: "admin",
    initialState: {
        adminAccounts: [],
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
            .addCase(getAdminAccount.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAdminAccount.fulfilled, (state, action) => {
                state.loading = false
                state.adminAccounts = action.payload.data
                state.page = action.payload.pagination.page
                state.totalPage = action.payload.pagination.totalPage
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
    async (data, { rejectWithValue }) => {
        try {
            const res = await getAdminAccountAPI(data);
            return res;
        } catch (err) {
            console.log(err)
            return rejectWithValue(err.response.data)
        }
    }
);

// export const getCustomerAccount = createAsyncThunk(
//     "account/getCustomerAccount",
//     async (data, { rejectWithValue }) => {
//         try {
//             const res = await getCustomerAccountAPI(data);
//             return res;
//         } catch (err) {
//             console.log(err)
//             return rejectWithValue(err.response.data)
//         }
//     }
// );


// export const createCustomerAccount = createAsyncThunk(
//     "account/createCustomerAccount",
//     async (data, { rejectWithValue }) => {
//         try {
//             const res = await createCustomerAccountAPI(data);
//             return res;
//         } catch (err) {
//             console.log(err)
//             return rejectWithValue(err.response.data)
//         }
//     }
// );

export default adminSlice