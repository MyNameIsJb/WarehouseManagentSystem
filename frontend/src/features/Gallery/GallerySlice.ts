import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import * as api from "../../api";

export interface itemsInterface {
  _id?: string;
  brandName: string;
  itemDescription: string;
  classification: string;
  price: string;
  image: string | undefined;
}

export interface paginationInterface {
  count: number;
  pageCount: number;
}

export interface galleryInterface {
  pagination: paginationInterface;
  items: itemsInterface[];
}

interface GalleryState {
  images: galleryInterface | null;
  singleImage: itemsInterface | null;
  loading: boolean;
  errors: any;
}

const initialState: GalleryState = {
  images: null,
  singleImage: null,
  loading: false,
  errors: null,
};

export const getAllImagesAction = createAsyncThunk<galleryInterface, number>(
  "gallery/getAllImagesAction",
  async (page, thunkAPI) => {
    try {
      const response = await api.getAllImagesAPI(page);
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

export const uploadImageAction = createAsyncThunk<object, itemsInterface>(
  "gallery/uploadImageAction",
  async (data, thunkAPI) => {
    try {
      const response = await api.uploadImageAPI(data);
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

export const getImageAction = createAsyncThunk<
  itemsInterface,
  string | undefined
>("gallery/getImageAction", async (id, thunkAPI) => {
  try {
    const response = await api.getImageAPI(id);
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

export const updateImageAction = createAsyncThunk<object, itemsInterface>(
  "gallery/updateImageAction",
  async (data, thunkAPI) => {
    try {
      const response = await api.updateImageAPI(data);
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

export const deleteImageAction = createAsyncThunk<object, string | undefined>(
  "gallery/deleteImageAction",
  async (id, thunkAPI) => {
    try {
      const response = await api.deleteImageAPI(id);
      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success",
        timer: 2000,
      });
      thunkAPI.dispatch(getAllImagesAction(1));
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

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    removeSingleImageAction: (state) => {
      state.singleImage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllImagesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllImagesAction.fulfilled, (state, action) => {
      state.images = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllImagesAction.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
    builder.addCase(uploadImageAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadImageAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(uploadImageAction.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
    builder.addCase(getImageAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getImageAction.fulfilled, (state, action) => {
      state.loading = false;
      state.singleImage = action.payload;
    });
    builder.addCase(getImageAction.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
    builder.addCase(updateImageAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateImageAction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateImageAction.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
    builder.addCase(deleteImageAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteImageAction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteImageAction.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default gallerySlice.reducer;
export const { removeSingleImageAction } = gallerySlice.actions;
