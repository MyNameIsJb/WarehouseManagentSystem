import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import * as api from "../../api";

export interface itemsInterface {
  _id: string;
  productId: string;
  brandName: string;
  description: string;
  model: string;
  quantity: number;
  store: string;
  orderedDate: Date;
}

export interface paginationInterface {
  count: number;
  pageCount: number;
}

export interface orderProductInterface {
  pagination: paginationInterface;
  items: itemsInterface[];
}

interface OrderProductState {
  products: orderProductInterface | null;
  singleProducts: itemsInterface | null;
  loading: boolean;
  errors: any;
}

const initialState: OrderProductState = {
  products: null,
  singleProducts: null,
  loading: false,
  errors: null,
};

export const getAllOrderProductsAction = createAsyncThunk<
  orderProductInterface,
  number
>("orderProduct/getAllOrderProductsAction", async (page, thunkAPI) => {
  try {
    const response = await api.getAllOrderProductsAPI(page);
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

export const orderProductSlice = createSlice({
  name: "orderProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllOrderProductsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllOrderProductsAction.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllOrderProductsAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default orderProductSlice.reducer;
