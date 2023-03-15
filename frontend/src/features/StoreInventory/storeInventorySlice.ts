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
  wareHousePrice: string;
  storePrice: string;
}

export interface paginationInterface {
  count: number;
  pageCount: number;
}

export interface storeInventoryInterface {
  pagination: paginationInterface;
  items: itemsInterface[];
}

interface StoreInventoryState {
  products: storeInventoryInterface | null;
  singleProduct: itemsInterface | null;
  loading: boolean;
  errors: any;
}

const initialState: StoreInventoryState = {
  products: null,
  singleProduct: null,
  loading: false,
  errors: null,
};

export const getAllStoreInventoryAction = createAsyncThunk<
  storeInventoryInterface,
  number
>("storeInventory/getAllStoreInventoryAction", async (page, thunkAPI) => {
  try {
    const response = await api.getAllStoreInventoryAPI(page);
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

export const getStoreProductAction = createAsyncThunk<
  itemsInterface,
  string | undefined
>("storeInventory/getStoreProductAction", async (id, thunkAPI) => {
  try {
    const response = await api.getStoreProductAPI(id);
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

export const updateStorePriceAction = createAsyncThunk<object, itemsInterface>(
  "storeInventory/updateStorePriceAction",
  async (data, thunkAPI) => {
    try {
      const response = await api.updateStorePriceAPI(data);
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

export const storeInventorySlice = createSlice({
  name: "storeInventory",
  initialState,
  reducers: {
    removeSingleProductAction: (state) => {
      state.singleProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllStoreInventoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllStoreInventoryAction.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllStoreInventoryAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(getStoreProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStoreProductAction.fulfilled, (state, action) => {
      state.singleProduct = action.payload;
      state.loading = false;
    });
    builder.addCase(getStoreProductAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(updateStorePriceAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateStorePriceAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateStorePriceAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default storeInventorySlice.reducer;
export const { removeSingleProductAction } = storeInventorySlice.actions;
