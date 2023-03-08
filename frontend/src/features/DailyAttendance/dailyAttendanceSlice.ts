import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import * as api from "../../api";

export interface itemsInterface {
  name: string;
  activity: string;
  productId: string;
  brandName: string;
  description: string;
  model: string;
  quantity: number;
  dateOfActivity: Date;
}

export interface paginationInterface {
  count: number;
  pageCount: number;
}

export interface dailyAttendanceInterface {
  pagination: paginationInterface;
  items: itemsInterface[];
}

export interface DailyAttendanceState {
  attendance: dailyAttendanceInterface | null;
  loading: boolean;
  errors: any;
}

const initialState: DailyAttendanceState = {
  attendance: null,
  loading: false,
  errors: null,
};

export const getAllDailyAttendanceAction = createAsyncThunk<
  dailyAttendanceInterface,
  number
>("dailyAttendance/getAllDailyAttendanceAction", async (page, thunkAPI) => {
  try {
    const response = await api.getAllDailyAttendanceAPI(page);
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

export const dailyAttendanceSlice = createSlice({
  name: "dailyAttendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDailyAttendanceAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllDailyAttendanceAction.fulfilled, (state, action) => {
      state.attendance = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllDailyAttendanceAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default dailyAttendanceSlice.reducer;
