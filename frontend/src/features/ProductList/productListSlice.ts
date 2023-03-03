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
  pricePerUnit: string;
}

export interface paginationInterface {
  count: number;
  pageCount: number;
}

export interface productListInterface {
  pagination: paginationInterface;
  items: itemsInterface[];
}

interface ProductListState {
  products: productListInterface | null;
  singleProduct: itemsInterface | null;
  loading: boolean;
  errors: any;
}

const initialState: ProductListState = {
  products: null,
  singleProduct: null,
  loading: false,
  errors: null,
};

export const getAllProductsAction = createAsyncThunk<
  productListInterface,
  number
>("productList/getAllProductsAction", async (page, thunkAPI) => {
  try {
    const response = await api.getAllProductsAPI(page);
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

export const createProductAction = createAsyncThunk<object, itemsInterface>(
  "productList/createProductAction",
  async (data, thunkAPI) => {
    try {
      const response = await api.createProductAPI(data);
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

export const getProductAction = createAsyncThunk<
  itemsInterface,
  string | undefined
>("productList/getProductController", async (id, thunkAPI) => {
  try {
    const response = await api.getProductAPI(id);
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

export const updateProductAction = createAsyncThunk<object, itemsInterface>(
  "productList/updateProductAction",
  async (data, thunkAPI) => {
    try {
      const response = await api.updateProductAPI(data);
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

export const deleteProductAction = createAsyncThunk<object, string | undefined>(
  "productList/deleteProductAction",
  async (id, thunkAPI) => {
    try {
      const response = await api.deleteProductAPI(id);
      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success",
        timer: 2000,
      });
      thunkAPI.dispatch(getAllProductsAction(1));
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

export const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    removeSingleProductAction: (state) => {
      state.singleProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProductsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProductsAction.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllProductsAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(createProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(getProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductAction.fulfilled, (state, action) => {
      state.singleProduct = action.payload;
      state.loading = false;
    });
    builder.addCase(getProductAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(updateProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProductAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateProductAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProductAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteProductAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default productListSlice.reducer;
export const { removeSingleProductAction } = productListSlice.actions;
