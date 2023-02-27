import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";
import Swal from "sweetalert2";

export interface LoginInterface {
  username: string;
  password: string;
}

interface LoginState {
  loading: boolean;
  errors: any;
}

const initialState: LoginState = {
  loading: false,
  errors: null,
};

// Actions
export const signInAction = createAsyncThunk<object, LoginInterface>(
  "login/signInAction",
  async (data, thunkAPI) => {
    try {
      const response = await api.signInAPI(data);
      localStorage.setItem("token", response.data.token);
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

// Reducers
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logoutAction: (state) => {
      localStorage.removeItem("token");
      Swal.fire({
        title: "Success!",
        text: "Logout Successfully",
        icon: "success",
        timer: 2000,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signInAction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(signInAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default loginSlice.reducer;
export const { logoutAction } = loginSlice.actions;
