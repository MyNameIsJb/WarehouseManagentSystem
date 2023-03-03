import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import * as api from "../../api";

export interface ResetPasswordInterface {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ResetPasswordState {
  loading: boolean;
  errors: any;
}

const initialState: ResetPasswordState = {
  loading: false,
  errors: null,
};

export const resetPasswordAction = createAsyncThunk<
  object,
  ResetPasswordInterface
>("resetPassword/resetPasswordAction", async (data, thunkAPI) => {
  try {
    const response = await api.resetPasswordAPI(data);
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

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetPasswordAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPasswordAction.fulfilled, (state, ation) => {
      state.loading = false;
    });
    builder.addCase(resetPasswordAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default resetPasswordSlice.reducer;
