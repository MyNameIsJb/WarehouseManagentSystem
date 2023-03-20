import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../api";
import Swal from "sweetalert2";

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

interface ProfileState {
  profileData: profileInterface | null;
  loading: boolean;
  errors: any;
}

const initialState: ProfileState = {
  profileData: null,
  loading: false,
  errors: null,
};

export const getProfileAction = createAsyncThunk<profileInterface>(
  "profile/getProfileAction",
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

export const updateProfileAction = createAsyncThunk<object, profileInterface>(
  "profile/updateProfileAction",
  async (data, thunkAPI) => {
    try {
      const response = await api.updateProfileAPI(data);
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

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setForcedLogoutAction: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("levelOfAccess");
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
    builder.addCase(updateProfileAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfileAction.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(updateProfileAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default profileSlice.reducer;
export const { setForcedLogoutAction } = profileSlice.actions;
