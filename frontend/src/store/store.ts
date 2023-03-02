import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../features/Login/loginSlice";
import dashboardReducer from "../features/Dashboard/dashboardSlice";
import forgotPasswordReducer from "../features/ForgotPassword/forgotPasswordSlice";
import resetPasswordReducer from "../features/ResetPassword/resetPasswordSlice";
import employeeListReducer from "../features/EmployeeList/employeeListSlice";
import productListReducer from "../features/ProductList/productListSlice";
import galleryReducer from "../features/Gallery/GallerySlice";
import saleReducer from "../features/Sale/saleSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  dashboard: dashboardReducer,
  employeeList: employeeListReducer,
  productList: productListReducer,
  gallery: galleryReducer,
  sale: saleReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
