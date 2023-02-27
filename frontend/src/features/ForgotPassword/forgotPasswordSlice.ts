import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import * as api from "../../api";

export interface forgotPasswordInterface {
  email: string;
}

interface ForgotPasswordState {
  loading: boolean;
  errors: any;
}

const initialState: ForgotPasswordState = {
  loading: false,
  errors: null,
};

// Actions
export const forgotPasswordAction = createAsyncThunk<
  object,
  forgotPasswordInterface
>("forgotPassword/forgotPasswordAction", async (data, thunkAPI) => {
  try {
    const response = await api.forgotPasswordAPI(data);
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

// Reducers
export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(forgotPasswordAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgotPasswordAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(forgotPasswordAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default forgotPasswordSlice.reducer;
