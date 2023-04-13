import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import contractSlice from "./contract/contractSlice";
import residentSlice from "./resident/residentSlice";
import serviceSlice from "./service/serviceSlice";
import userSlice from "./user/userSlice";
import flatSlice from "./flat/flatSlice.js";
import buildingSlice from "./building/buildingSlice.js";
import adminSlice from "./admin/adminSlice.js";
import dashboardSlice from "./dashboard/dashboardSlice.js";
import billSlice from "./bill/billSlice.js";
import notificationSlice from "./notification/notificationSlice.js";

const store = configureStore({
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
    },
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: false
        })
    ],
})
export default store;