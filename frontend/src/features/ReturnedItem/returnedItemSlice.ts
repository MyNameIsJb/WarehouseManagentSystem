import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import * as api from "../../api";

export interface itemsInterface {
  productId: string;
  brandName: string;
  description: string;
  model: string;
  quantity: number;
  reason: string;
  store: string;
  returnedDate: Date;
}

export interface paginationInterface {
  count: number;
  pageCount: number;
}

export interface returnedItemInterface {
  pagination: paginationInterface;
  items: itemsInterface[];
}

export interface ReturnedItemState {
  product: returnedItemInterface | null;
  loading: boolean;
  errors: any;
}

const initialState: ReturnedItemState = {
  product: null,
  loading: false,
  errors: null,
};

export const getAllReturnedItemsAction = createAsyncThunk<
  returnedItemInterface,
  number
>("returnedItem/getAllReturnedItemsAction", async (page, thunkAPI) => {
  try {
    const response = await api.getAllReturnedItemsAPI(page);
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

export const returnedItemSlice = createSlice({
  name: "returnedItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllReturnedItemsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllReturnedItemsAction.fulfilled, (state, action) => {
      state.product = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllReturnedItemsAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default returnedItemSlice.reducer;
