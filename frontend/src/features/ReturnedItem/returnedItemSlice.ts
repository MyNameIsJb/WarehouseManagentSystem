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
  singleProduct: itemsInterface | null;
  loading: boolean;
  errors: any;
}

const initialState: ReturnedItemState = {
  product: null,
  singleProduct: null,
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

export const createReturnedItemAction = createAsyncThunk<
  object,
  itemsInterface
>("returnedItem/createReturnedItemAction", async (data, thunkAPI) => {
  try {
    const response = await api.createReturnedItemAPI(data);
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

export const getReturnedItemAction = createAsyncThunk<
  itemsInterface,
  string | undefined
>("returnedItem/getReturnedItemAction", async (id, thunkAPI) => {
  try {
    const response = await api.getReturnedItemAPI(id);
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

export const updateReturnedItemAction = createAsyncThunk<
  object,
  itemsInterface
>("returnedItem/updateReturnedItemAction", async (data, thunkAPI) => {
  try {
    const response = await api.updateReturnedItemAPI(data);
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
    thunkAPI.rejectWithValue(error);
  }
});

export const deleteReturnedItemAction = createAsyncThunk<
  object,
  string | undefined
>("returnedItem/deleteReturnedItemAction", async (id, thunkAPI) => {
  try {
    const response = await api.deleteReturnedItemAPI(id);
    Swal.fire({
      title: "Success!",
      text: response.data.message,
      icon: "success",
      timer: 2000,
    });
    thunkAPI.dispatch(getAllReturnedItemsAction(1));
    return response.data;
  } catch (error: any) {
    Swal.fire({
      title: "Error!",
      text: error.response.data.message,
      icon: "error",
      timer: 2000,
    });
    thunkAPI.rejectWithValue(error);
  }
});

export const returnedItemSlice = createSlice({
  name: "returnedItem",
  initialState,
  reducers: {
    removeSingleProductAction: (state) => {
      state.singleProduct = null;
    },
  },
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
    builder.addCase(createReturnedItemAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createReturnedItemAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createReturnedItemAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(getReturnedItemAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReturnedItemAction.fulfilled, (state, action) => {
      state.singleProduct = action.payload;
      state.loading = false;
    });
    builder.addCase(getReturnedItemAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(updateReturnedItemAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateReturnedItemAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateReturnedItemAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteReturnedItemAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteReturnedItemAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteReturnedItemAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default returnedItemSlice.reducer;
export const { removeSingleProductAction } = returnedItemSlice.actions;
