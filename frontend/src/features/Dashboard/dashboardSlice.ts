import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import * as api from "../../api";

export interface dashboardInterface {
  _id: string;
  username: string;
  name: string;
  email: string;
  address: string;
  birthDate: string;
  contactNumber: string;
  levelOfAccess: string;
  store: string;
}

interface dashboardState {
  profileData: dashboardInterface | null;
  loading: boolean;
  errors: any;
}

const initialState: dashboardState = {
  profileData: null,
  loading: false,
  errors: null,
};

// Actions
export const getProfileAction = createAsyncThunk<dashboardInterface>(
  "dashboard/getProfileAction",
  async (_, thunkAPI) => {
    try {
      const response = await api.getProfileAPI();
      return response.data;
    } catch (error: any) {
      thunkAPI.dispatch(setForcedLogoutAction());
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
export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setForcedLogoutAction: (state) => {
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfileAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProfileAction.fulfilled, (state, action) => {
      state.profileData = action.payload;
      state.loading = false;
    });
    builder.addCase(getProfileAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default dashboardSlice.reducer;
export const { setForcedLogoutAction } = dashboardSlice.actions;
