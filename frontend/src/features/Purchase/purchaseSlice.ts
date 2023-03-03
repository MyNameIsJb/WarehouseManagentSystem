import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import * as api from "../../api";

export interface itemsInterface {
  _id: string;
  dateOfTransaction: Date;
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

export interface purchaseInterface {
  pagination: paginationInterface;
  items: itemsInterface[];
}

interface PurchaseState {
  purchases: purchaseInterface | null;
  singlePurchase: itemsInterface | null;
  loading: boolean;
  errors: any;
}

const initialState: PurchaseState = {
  purchases: null,
  singlePurchase: null,
  loading: false,
  errors: null,
};

export const getAllPurchasesAction = createAsyncThunk<
  purchaseInterface,
  number
>("purchase/getAllPurchasesAction", async (page, thunkAPI) => {
  try {
    const response = await api.getAllPurchasesAPI(page);
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
});

export const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPurchasesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPurchasesAction.fulfilled, (state, action) => {
      state.purchases = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllPurchasesAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default purchaseSlice.reducer;
