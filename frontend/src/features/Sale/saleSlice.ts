import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import * as api from "../../api";

export interface itemsInterface {
  _id: string;
  dateOfTransaction: Date;
  productId: string;
  brandName: string;
  description: string;
  model: string;
  quantity: number;
  totalPrice: string;
  nameOfStore: string;
  createdAt: Date;
}

export interface paginationInterface {
  count: number;
  pageCount: number;
}

export interface saleInterface {
  pagination: paginationInterface;
  items: itemsInterface[];
}

interface SaleState {
  sales: saleInterface | null;
  singleSale: itemsInterface | null;
  loading: boolean;
  errors: any;
}

const initialState: SaleState = {
  sales: null,
  singleSale: null,
  loading: false,
  errors: null,
};

export const getAllSalesAction = createAsyncThunk<saleInterface, number>(
  "sale/getAllSalesAction",
  async (page, thunkAPI) => {
    try {
      const response = await api.getAllSalesAPI(page);
      return response.data;
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        timer: 2000,
      });
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createSaleAction = createAsyncThunk<object, itemsInterface>(
  "sale/createSaleAction",
  async (data, thunkAPI) => {
    try {
      const response = await api.createSaleAPI(data);
      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success",
        timer: 2000,
      });
      return response.data;
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
        timer: 2000,
      });
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSalesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllSalesAction.fulfilled, (state, action) => {
      state.sales = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllSalesAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(createSaleAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createSaleAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createSaleAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default saleSlice.reducer;
