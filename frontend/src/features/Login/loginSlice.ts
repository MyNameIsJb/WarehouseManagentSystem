import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";
import Swal from "sweetalert2";

export interface LoginInterface {
  username: string;
  password: string;
  token: string;
  levelOfAccess: string;
}

export interface profileInterface {
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

interface LoginState {
  profileData: profileInterface | null;
  loading: boolean;
  errors: any;
}

const initialState: LoginState = {
  profileData: null,
  loading: false,
  errors: null,
};

// Actions
export const signInAction = createAsyncThunk<LoginInterface, LoginInterface>(
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

export const getProfileAction = createAsyncThunk<profileInterface>(
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
    setForcedLogoutAction: (state) => {
      localStorage.removeItem("token");
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

export default loginSlice.reducer;
export const { logoutAction, setForcedLogoutAction } = loginSlice.actions;
