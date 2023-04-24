import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import billAPI from "../../config/api/bill/billAPI";
import { Bill, BillDetail, CreateBillRequest, CreateMonthlyBillRequest } from "../../types/bill.type";
import { Search } from "../../types/search.type";

const { getBillAPI, createBillAPI, getBillByIdAPI, getFileExcelAPI, createMonthlyBillAPI } = billAPI;

interface BillState {
  bills: Bill[],
  billDetail: BillDetail[],
  loading: boolean,
  error?: string,
  page: number,
  size: number,
  totalPage: number,
}

const initialState: BillState = {
  bills: [],
  billDetail: [],
  loading: false,
  error: "",
  page: 1,
  size: 10,
  totalPage: 0,
}

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBill.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBill.fulfilled, (state, action) => {
        state.loading = false;
        state.bills = action.payload.data.data;
        state.page = action.payload.data.pagination.page;
        state.totalPage = action.payload.data.pagination.totalPage;
      })
      .addCase(getBill.rejected, (state, action) => {
        state.loading = false;
        state.bills = [];
        state.error = action.error.message;
      })
      .addCase(createBill.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBill.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createBill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getBillById.fulfilled, (state, action) => {
        state.billDetail = action.payload.data.data;
      })
      .addCase(createMonthlyBill.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMonthlyBill.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createMonthlyBill.rejected, (state, action) => {
        state.loading = false;
      })
  },
});

export const getBill = createAsyncThunk(
  "bill/getBill",
  async (data: Search, { rejectWithValue }) => {
    try {
      const res = await getBillAPI(data);
      return res;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const createBill = createAsyncThunk(
  "bill/createBill",
  async (data: CreateBillRequest, { rejectWithValue }) => {
    try {
      const res = await createBillAPI(data);
      if (res.status === 201) {
        toast.success(res.data.message);
        return res;
      }
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createMonthlyBill = createAsyncThunk(
    "bill/createMonthlyBill",
    async (data: CreateMonthlyBillRequest, { rejectWithValue }) => {
      try {
        const res = await createMonthlyBillAPI(data);
        if (res.status === 201) {
          toast.success(res.data.message);
          return res;
        }
      } catch (err: any) {
        return rejectWithValue(err.response.data);
      }
    }
  );

export const getBillById = createAsyncThunk(
  "bill/getBillById",
  async (data: {id: string}, { rejectWithValue }) => {
    try {
      const res = await getBillByIdAPI(data);
      return res;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getFileExcel = createAsyncThunk(
  "bill/getFileExcel",
  async (data: {buildingId: string}, { rejectWithValue }) => {
    try {
      const res = await getFileExcelAPI(data);
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: "application/vnd.ms-excel" })
      );
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "Monthly_Bill_Sample.xls");
      document.body.appendChild(link);
      link.click();
      return res;
    } catch (err: any) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);



export default billSlice;
