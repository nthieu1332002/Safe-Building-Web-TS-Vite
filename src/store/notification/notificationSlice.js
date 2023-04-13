import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import notificationAPI from "../../config/api/notification/notificationAPI";

const { sendNotificationAPI, sendMultiNotificationAPI } = notificationAPI;

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notifications: [],
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
            .addCase(sendNotification.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendNotification.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(sendNotification.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(sendMultiNotification.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendMultiNotification.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(sendMultiNotification.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const sendNotification = createAsyncThunk(
    "notification/sendNotification",
    async (data, { rejectWithValue }) => {
        try {
            const res = await sendNotificationAPI(data);
            if (res.status === 200) {
                toast.success(res.data)
                return res
            }
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
);

export const sendMultiNotification = createAsyncThunk(
    "notification/sendMultiNotification",
    async (data, { rejectWithValue }) => {
        try {
            const res = await sendMultiNotificationAPI(data);
            if (res.status === 200) {
                toast.success(res.data)
                return res
            }
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
);


export default notificationSlice