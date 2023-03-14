import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import * as api from "../../api";

export interface itemsInterface {
  _id?: string;
  productId: string;
  brandName: string;
  description: string;
  model: string;
  quantity: number;
  pricePerUnit: string;
  dateOfDelivery: Date;
}

export interface paginationInterface {
  count: number;
  pageCount: number;
}

export interface storeIncomingProductInterface {
  pagination: paginationInterface;
  items: itemsInterface[];
}

interface StoreIncomingProductState {
  products: storeIncomingProductInterface | null;
  loading: boolean;
  errors: any;
}

const initialState: StoreIncomingProductState = {
  products: null,
  loading: false,
  errors: null,
};

export const getAllStoreIncomingProductAction = createAsyncThunk<
  storeIncomingProductInterface,
  number
>(
  "storeIncomingProduct/getAllStoreIncomingProductAction",
  async (page, thunkAPI) => {
    try {
      const response = await api.getAllStoreIncomingProductAPI(page);
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

export const receivedStoreIncomingProductAction = createAsyncThunk<
  object,
  string | undefined
>(
  "storeIncomingProduct/receivedStoreIncomingProductAction",
  async (id, thunkAPI) => {
    try {
      const response = await api.receivedStoreIncomingProductAPI(id);
      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success",
        timer: 2000,
      });
      thunkAPI.dispatch(getAllStoreIncomingProductAction(1));
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

export const storeIncomingProductSlice = createSlice({
  name: "storeIncomingProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllStoreIncomingProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllStoreIncomingProductAction.fulfilled,
      (state, action) => {
        state.products = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(
      getAllStoreIncomingProductAction.rejected,
      (state, action) => {
        state.errors = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(receivedStoreIncomingProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      receivedStoreIncomingProductAction.fulfilled,
      (state, action) => {
        state.loading = false;
      }
    );
    builder.addCase(
      receivedStoreIncomingProductAction.rejected,
      (state, action) => {
        state.errors = action.payload;
        state.loading = false;
      }
    );
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default storeIncomingProductSlice.reducer;
