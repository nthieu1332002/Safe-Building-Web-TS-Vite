import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import contractSlice from "./contract/contractSlice";
import residentSlice from "./resident/residentSlice";
import serviceSlice from "./service/serviceSlice";
import userSlice from "./user/userSlice";
import flatSlice from "./flat/flatSlice";
import buildingSlice from "./building/buildingSlice";
import adminSlice from "./admin/adminSlice ";
import dashboardSlice from "./dashboard/dashboardSlice";
import billSlice from "./bill/billSlice";
import notificationSlice from "./notification/notificationSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        resident: residentSlice.reducer,
        contract: contractSlice.reducer,
        bill: billSlice.reducer,
        service: serviceSlice.reducer,
        flat: flatSlice.reducer,
        building: buildingSlice.reducer,
        admin: adminSlice.reducer,
        dashboard: dashboardSlice.reducer,
        notification: notificationSlice.reducer
    }
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types