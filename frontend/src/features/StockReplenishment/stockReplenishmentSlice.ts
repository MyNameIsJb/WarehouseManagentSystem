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
  singleProduct: itemsInterface | null;
  loading: boolean;
  errors: any;
}

const initialState: OrderProductState = {
  products: null,
  singleProduct: null,
  loading: false,
  errors: null,
};

export const getAllOrderedProductsAction = createAsyncThunk<
  orderProductInterface,
  number
>("orderProduct/getAllOrderProductsAction", async (page, thunkAPI) => {
  try {
    const response = await api.getAllOrderedProductsAPI(page);
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

export const orderProductAction = createAsyncThunk<object, itemsInterface>(
  "orderProduct/orderProductAction",
  async (data, thunkAPI) => {
    try {
      const response = await api.orderProductAPI(data);
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

export const getOrderedProductAction = createAsyncThunk<
  itemsInterface,
  string | undefined
>("orderProduct/getOrderedProductAction", async (id, thunkAPI) => {
  try {
    const response = await api.getOrderedProductAPI(id);
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

export const updateOrderedProductAction = createAsyncThunk<
  object,
  itemsInterface
>("orderProduct/updateOrderedProductAction", async (data, thunkAPI) => {
  try {
    const response = await api.updateOrderedProductAPI(data);
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

export const deleteOrderedProductAction = createAsyncThunk<
  object,
  string | undefined
>("orderProduct/deleteOrderedProductAction", async (id, thunkAPI) => {
  try {
    const response = await api.deleteOrderedProductAPI(id);
    Swal.fire({
      title: "Success!",
      text: response.data.message,
      icon: "success",
      timer: 2000,
    });
    thunkAPI.dispatch(getAllOrderedProductsAction(1));
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
  reducers: {
    removeSingleProductAction: (state) => {
      state.singleProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllOrderedProductsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllOrderedProductsAction.fulfilled, (state, action) => {
      state.products = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllOrderedProductsAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(orderProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(orderProductAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(orderProductAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrderedProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderedProductAction.fulfilled, (state, action) => {
      state.singleProduct = action.payload;
      state.loading = false;
    });
    builder.addCase(getOrderedProductAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(updateOrderedProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOrderedProductAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateOrderedProductAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteOrderedProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOrderedProductAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteOrderedProductAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default orderProductSlice.reducer;
export const { removeSingleProductAction } = orderProductSlice.actions;
