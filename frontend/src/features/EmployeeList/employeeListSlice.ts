import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import * as api from "../../api";

export interface filteredItemsInterface {
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

export interface paginationInterface {
  count: number;
  pageCount: number;
}

export interface employeeListInterface {
  pagination: paginationInterface;
  filteredItems: filteredItemsInterface[];
}

interface EmployeeListState {
  users: employeeListInterface | null;
  singleUser: filteredItemsInterface | null;
  loading: boolean;
  errors: any;
}

const initialState: EmployeeListState = {
  users: null,
  singleUser: null,
  loading: false,
  errors: null,
};

export const getAllUsersAction = createAsyncThunk<
  employeeListInterface,
  number
>("employeeList/getAllUserAction", async (page, thunkAPI) => {
  try {
    const response = await api.getAllUsersAPI(page);
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

export const createUserAction = createAsyncThunk<
  object,
  filteredItemsInterface
>("employeeList/createUserAction", async (data, thunkAPI) => {
  try {
    const response = await api.createUserAPI(data);
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

export const getUserAction = createAsyncThunk<
  filteredItemsInterface,
  string | undefined
>("employeeList/getUserAction", async (id, thunkAPI) => {
  try {
    const response = await api.getUserAPI(id);
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

export const updateUserAction = createAsyncThunk<
  object,
  filteredItemsInterface
>("employeeList/updateUserAction", async (data, thunkAPI) => {
  try {
    const response = await api.updateUserAPI(data);
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

export const deleteUserAction = createAsyncThunk<object, string | undefined>(
  "employeeList/deleteUserAction",
  async (id, thunkAPI) => {
    try {
      const response = await api.deleteUserAPI(id);
      Swal.fire({
        title: "Success!",
        text: response.data.message,
        icon: "success",
        timer: 2000,
      });
      thunkAPI.dispatch(getAllUsersAction(1));
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

export const employeeListSlice = createSlice({
  name: "employeeList",
  initialState,
  reducers: {
    removeSingleUserAction: (state) => {
      state.singleUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsersAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsersAction.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllUsersAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(createUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createUserAction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createUserAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserAction.fulfilled, (state, action) => {
      state.singleUser = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(updateUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserAction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase(deleteUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUserAction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteUserAction.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    });
    builder.addCase("LOGOUT", (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default employeeListSlice.reducer;
export const { removeSingleUserAction } = employeeListSlice.actions;
