import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import * as api from "../../api";

export interface itemsInterface {
  productId: string;
}

export interface barcodeGeneratorInterface {
  items: itemsInterface[];
}

interface BarcodeGeneratorState {
  barcodes: barcodeGeneratorInterface | null;
  loading: boolean;
  errors: any;
}

const initialState: BarcodeGeneratorState = {
  barcodes: null,
  loading: false,
  errors: null,
};

export const getAllBarcodesAction = createAsyncThunk<barcodeGeneratorInterface>(
  "barcodeGenerator/getAllBarcodesAction",
  async (_, thunkAPI) => {
    try {
      const response = await api.getAllBarcodesAPI();
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

export const createBarcodeAction = createAsyncThunk<object, itemsInterface>(
  "barcodeGenerator/createBarcodeAction",
  async (data, thunkAPI) => {
    try {
      const response = await api.createBarcodeAPI(data);
      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success",
        timer: 2000,
      });
      thunkAPI.dispatch(getAllBarcodesAction());
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

export const deleteAllBarcodesAction = createAsyncThunk<object>(
  "barcodeGenerator/deleteAllBarcodesAction",
  async (id, thunkAPI) => {
    try {
      const response = await api.deleteAllBarcodesAPI();
      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success",
        timer: 2000,
      });
      thunkAPI.dispatch(getAllBarcodesAction());
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

export const barcodeGeneratorSlice = createSlice({
  name: "barcodeGenerator",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBarcodesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllBarcodesAction.fulfilled, (state, action) => {
      state.barcodes = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllBarcodesAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(createBarcodeAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBarcodeAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createBarcodeAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteAllBarcodesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAllBarcodesAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteAllBarcodesAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default barcodeGeneratorSlice.reducer;
