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
}

export interface paginationInterface {
  count: number;
  pageCount: number;
}

export interface incomingProductInterface {
  pagination: paginationInterface;
  items: itemsInterface[];
}

interface IncomingProductState {
  incomingProducts: incomingProductInterface | null;
  singleIncomingProduct: itemsInterface | null;
  loading: boolean;
  errors: any;
}

const initialState: IncomingProductState = {
  incomingProducts: null,
  singleIncomingProduct: null,
  loading: false,
  errors: null,
};

export const getAllIncomingProductsAction = createAsyncThunk<
  incomingProductInterface,
  number
>("incomingProduct/getAllIncomingProductsAction", async (page, thunkAPI) => {
  try {
    const response = await api.getAllIncomingProductsAPI(page);
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

export const createIncomingProductAction = createAsyncThunk<
  object,
  itemsInterface
>("incomingProduct/createIncomingProductAction", async (data, thunkAPI) => {
  try {
    const response = await api.createIncomingProductAPI(data);
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

export const getIncomingProductAction = createAsyncThunk<
  itemsInterface,
  string | undefined
>("incomingProduct/getIncomingProductAction", async (id, thunkAPI) => {
  try {
    const response = await api.getIncomingProductAPI(id);
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

export const updateIncomingProductAction = createAsyncThunk<
  object,
  itemsInterface
>("incomingProduct/updateIncomingProductAction", async (data, thunkAPI) => {
  try {
    const response = await api.updateIncomingProductAPI(data);
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

export const deleteIncomingProductAction = createAsyncThunk<
  object,
  string | undefined
>("incomingProduct/deleteIncomingProductAction", async (id, thunkAPI) => {
  try {
    const response = await api.deleteIncomingProductAPI(id);
    Swal.fire({
      title: "Success!",
      text: response.data.message,
      icon: "success",
      timer: 2000,
    });
    thunkAPI.dispatch(getAllIncomingProductsAction(1));
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

export const receivedIncomingProductAction = createAsyncThunk<
  object,
  string | undefined
>("incomingProduct/receivedIncomingProductAction", async (id, thunkAPI) => {
  try {
    const response = await api.receivedIncomingProductAPI(id);
    Swal.fire({
      title: "Success!",
      text: response.data.message,
      icon: "success",
      timer: 2000,
    });
    thunkAPI.dispatch(getAllIncomingProductsAction(1));
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

export const incomingProductSlice = createSlice({
  name: "incomingProduct",
  initialState,
  reducers: {
    removeSingleIncomingProductAction: (state) => {
      state.singleIncomingProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllIncomingProductsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllIncomingProductsAction.fulfilled, (state, action) => {
      state.incomingProducts = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllIncomingProductsAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(createIncomingProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createIncomingProductAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createIncomingProductAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(getIncomingProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getIncomingProductAction.fulfilled, (state, action) => {
      state.singleIncomingProduct = action.payload;
      state.loading = false;
    });
    builder.addCase(getIncomingProductAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(updateIncomingProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateIncomingProductAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateIncomingProductAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteIncomingProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteIncomingProductAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteIncomingProductAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(receivedIncomingProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      receivedIncomingProductAction.fulfilled,
      (state, action) => {
        state.loading = false;
      }
    );
    builder.addCase(receivedIncomingProductAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default incomingProductSlice.reducer;
export const { removeSingleIncomingProductAction } =
  incomingProductSlice.actions;
