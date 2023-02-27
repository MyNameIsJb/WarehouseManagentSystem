import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import * as api from "../../api";

export interface CreatePasswordInterface {
  email: string;
  password: string;
  confirmPassword: string;
}

interface CreatePasswordState {
  loading: boolean;
  errors: any;
}

const initialState: CreatePasswordState = {
  loading: false,
  errors: null,
};

export const createPasswordAction = createAsyncThunk<
  object,
  CreatePasswordInterface
>("createPassword/createPasswordAction", async (data, thunkAPI) => {
  try {
    const response = await api.createPasswordAPI(data);
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

export const createPasswordSlice = createSlice({
  name: "createPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPasswordAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPasswordAction.fulfilled, (state, ation) => {
      state.loading = false;
    });
    builder.addCase(createPasswordAction.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default createPasswordSlice.reducer;
