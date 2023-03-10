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
import forgotPasswordReducer from "../features/ForgotPassword/forgotPasswordSlice";
import resetPasswordReducer from "../features/ResetPassword/resetPasswordSlice";
import employeeListReducer from "../features/EmployeeList/employeeListSlice";
import productListReducer from "../features/ProductList/productListSlice";
import galleryReducer from "../features/Gallery/GallerySlice";
import saleReducer from "../features/Sale/saleSlice";
import purchaseReducer from "../features/Purchase/purchaseSlice";
import incomingProductReducer from "../features/IncomingProduct/incomingProductSlice";
import outgoingProductReducer from "../features/OutgoingProduct/outgoingProductSlice";
import orderProductReducer from "../features/StockReplenishment/stockReplenishmentSlice";
import dailyAttendanceReducer from "../features/DailyAttendance/dailyAttendanceSlice";
import returnedItemReducer from "../features/ReturnedItem/returnedItemSlice";
import barcodeGeneratorReducer from "../features/BarcodeGenerator/barcodeGeneratorSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  login: loginReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  employeeList: employeeListReducer,
  productList: productListReducer,
  gallery: galleryReducer,
  sale: saleReducer,
  purchase: purchaseReducer,
  incomingProduct: incomingProductReducer,
  outgoingProduct: outgoingProductReducer,
  orderProduct: orderProductReducer,
  dailyAttendance: dailyAttendanceReducer,
  returnedItem: returnedItemReducer,
  barcodeGenerator: barcodeGeneratorReducer,
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
