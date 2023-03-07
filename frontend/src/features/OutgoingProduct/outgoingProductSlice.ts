import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import * as api from "../../api";

export interface itemsInterface {
  _id: string;
  trackingId: string;
  brandName: string;
  description: string;
  model: string;
  quantity: number;
  totalPrice: string;
  dateOfTransaction: Date;
  store: string | void;
  productId: string;
}

export interface paginationInterface {
  count: number;
  pageCount: number;
}

export interface outgoingProductInterface {
  pagination: paginationInterface;
  items: itemsInterface[];
}

interface OutgoingProductState {
  outgoingProducts: outgoingProductInterface | null;
  singleOutgoingProduct: itemsInterface | null;
  loading: boolean;
  errors: any;
}

const initialState: OutgoingProductState = {
  outgoingProducts: null,
  singleOutgoingProduct: null,
  loading: false,
  errors: null,
};

export const getAllOutgoingProductsAction = createAsyncThunk<
  outgoingProductInterface,
  number
>("outgoingProduct/getAllOutgoingProductsAction", async (page, thunkAPI) => {
  try {
    const response = await api.getAllOutgoingProductsAPI(page);
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

export const createOutgoingProductAction = createAsyncThunk<
  object,
  itemsInterface
>("outgoingProduct/createOutgoingProductAction", async (data, thunkAPI) => {
  try {
    const response = await api.createOutgoingProductAPI(data);
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
});

export const getOutgoingProductAction = createAsyncThunk<
  itemsInterface,
  string | undefined
>("outgoingProduct/getOutgoingProductAction", async (id, thunkAPI) => {
  try {
    const response = await api.getOutgoingProductAPI(id);
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

export const updateOutgoingProductAction = createAsyncThunk<
  object,
  itemsInterface
>("outgoingProduct/updateOutgoingProductAction", async (data, thunkAPI) => {
  try {
    const response = await api.updateOutgoingProductAPI(data);
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
});

export const deleteOutgoingProductAction = createAsyncThunk<
  object,
  string | undefined
>("outgoingProduct/deleteOutgoingProductAction", async (id, thunkAPI) => {
  try {
    const response = await api.deleteOutgoingProductAPI(id);
    Swal.fire({
      title: "Success!",
      text: response.data.message,
      icon: "success",
      timer: 2000,
    });
    thunkAPI.dispatch(getAllOutgoingProductsAction(1));
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

export const outgoingProductSlice = createSlice({
  name: "outgoingProduct",
  initialState,
  reducers: {
    removeSingleOutgoingProductAction: (state) => {
      state.singleOutgoingProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllOutgoingProductsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllOutgoingProductsAction.fulfilled, (state, action) => {
      state.outgoingProducts = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllOutgoingProductsAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(createOutgoingProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOutgoingProductAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createOutgoingProductAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(getOutgoingProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOutgoingProductAction.fulfilled, (state, action) => {
      state.singleOutgoingProduct = action.payload;
      state.loading = false;
    });
    builder.addCase(getOutgoingProductAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(updateOutgoingProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOutgoingProductAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateOutgoingProductAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteOutgoingProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOutgoingProductAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteOutgoingProductAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default outgoingProductSlice.reducer;
export const { removeSingleOutgoingProductAction } =
  outgoingProductSlice.actions;
