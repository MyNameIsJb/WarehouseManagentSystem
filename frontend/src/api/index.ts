import axios from "axios";

// Base API that dont require token
const userAPI = axios.create({
  baseURL: "https://backend-piog.onrender.com/user",
});

// Base API that require token
const authUserAPI = axios.create({
  baseURL: "https://backend-piog.onrender.com/user",
});
const authProductAPI = axios.create({
  baseURL: "https://backend-piog.onrender.com/product",
});
const authGalleryAPI = axios.create({
  baseURL: "https://backend-piog.onrender.com/gallery",
});
const authSaleAPI = axios.create({
  baseURL: "https://backend-piog.onrender.com/sale",
});
const authPurchaseAPI = axios.create({
  baseURL: "https://backend-piog.onrender.com/purchase",
});
const authIncomingProductAPI = axios.create({
  baseURL: "https://backend-piog.onrender.com/incomingProduct",
});
const authOutgoingProductAPI = axios.create({
  baseURL: "https://backend-piog.onrender.com/outgoingProduct",
});
const authOrderProductAPI = axios.create({
  baseURL: "https://backend-piog.onrender.com/orderProduct",
});
const authDailyAttendanceAPI = axios.create({
  baseURL: "https://backend-piog.onrender.com/dailyAttendance",
});
const authReturnedItemAPI = axios.create({
  baseURL: "https://backend-piog.onrender.com/returnedItem",
});
const authBarcodeGeneratorAPI = axios.create({
  baseURL: "https://backend-piog.onrender.com/barcodeGenerator",
});
const authStoreInventoryAPI = axios.create({
  baseURL: "https://backend-piog.onrender.com/storeInventory",
});
const authStoreIncomingProductAPI = axios.create({
  baseURL: "https://backend-piog.onrender.com/storeIncomingProduct",
});

authUserAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

authProductAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

authGalleryAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

authSaleAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

authPurchaseAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

authIncomingProductAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

authOutgoingProductAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

authOrderProductAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

authDailyAttendanceAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

authReturnedItemAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

authBarcodeGeneratorAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

authStoreInventoryAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

authStoreIncomingProductAPI.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return req;
});

//Route that dont require token
export const signInAPI = (data: object) => userAPI.post("/signIn", data);
export const forgotPasswordAPI = (data: object) =>
  userAPI.post("/forgotPassword", data);
export const resetPasswordAPI = (data: object) =>
  userAPI.post("/resetPassword", data);
export const createPasswordAPI = (data: object) =>
  userAPI.post("/createPassword", data);

//Route that require token
// Employee List Router
export const getProfileAPI = () => authUserAPI.get("/getProfile");
export const getAllUsersAPI = (page: number | any) =>
  authUserAPI.get("/getAllUsers", { params: { page: page } });
export const createUserAPI = (data: object) =>
  authUserAPI.post("/createUser", data);
export const getUserAPI = (id: string | undefined) =>
  authUserAPI.get(`/getUser/${id}`);
export const updateUserAPI = (data: object | any) =>
  authUserAPI.post(`/updateUser/${data.id}`, data);
export const deleteUserAPI = (id: string | undefined) =>
  authUserAPI.delete(`/deleteUser/${id}`);
export const updateProfileAPI = (data: object | any) =>
  authUserAPI.put("/updateProfile", data);

// Product List Router
export const getAllProductsAPI = (page: number | any) =>
  authProductAPI.get("/getAllProducts", { params: { page: page } });
export const createProductAPI = (data: object) =>
  authProductAPI.post("/createProduct", data);
export const getProductAPI = (id: string | undefined) =>
  authProductAPI.get(`/getProduct/${id}`);
export const updateProductAPI = (data: Object | any) =>
  authProductAPI.put(`/updateProduct/${data.id}`, data);
export const deleteProductAPI = (id: string | undefined) =>
  authProductAPI.delete(`/deleteProduct/${id}`);

// Gallery Router
export const getAllImagesAPI = (page: number | any) =>
  authGalleryAPI.get("/getAllImages", { params: { page: page } });
export const uploadImageAPI = (data: object | any) =>
  authGalleryAPI.post("/uploadImage", data);
export const getImageAPI = (id: string | undefined) =>
  authGalleryAPI.get(`/getImage/${id}`);
export const updateImageAPI = (data: object | any) =>
  authGalleryAPI.put(`/updateImage/${data.id}`, data);
export const deleteImageAPI = (id: string | undefined) =>
  authGalleryAPI.delete(`/deleteImage/${id}`);

// Sale Router
export const getAllSalesAPI = (page: number | any) =>
  authSaleAPI.get("/getAllSales", { params: { page: page } });
export const createSaleAPI = (data: object | any) =>
  authSaleAPI.post("/createSale", data);
export const getSaleAPI = (id: string | undefined) =>
  authSaleAPI.get(`/getSale/${id}`);
export const updateSaleAPI = (data: object | any) =>
  authSaleAPI.put(`/updateSale/${data.id}`, data);
export const deleteSaleAPI = (id: string | undefined) =>
  authSaleAPI.post(`/deleteSale/${id}`);

// Purchase Router
export const getAllPurchasesAPI = (page: number | any) =>
  authPurchaseAPI.get("/getAllPurchases", { params: { page: page } });

// Incoming Product Router
export const getAllIncomingProductsAPI = (page: number | any) =>
  authIncomingProductAPI.get("/getAllIncomingProducts", {
    params: { page: page },
  });
export const createIncomingProductAPI = (data: object | any) =>
  authIncomingProductAPI.post("/createIncomingProduct", data);
export const getIncomingProductAPI = (id: string | undefined) =>
  authIncomingProductAPI.get(`/getIncomingProduct/${id}`);
export const updateIncomingProductAPI = (data: object | any) =>
  authIncomingProductAPI.put(`/updateIncomingProduct/${data.id}`, data);
export const deleteIncomingProductAPI = (id: string | undefined) =>
  authIncomingProductAPI.delete(`/deleteIncomingProduct/${id}`);
export const receivedIncomingProductAPI = (id: string | undefined) =>
  authIncomingProductAPI.post(`/receivedIncomingProduct/${id}`);

// Outgoing Product Router
export const getAllOutgoingProductsAPI = (page: number | any) =>
  authOutgoingProductAPI.get("/getAllOutgoingProducts", {
    params: { page: page },
  });
export const createOutgoingProductAPI = (data: object | any) =>
  authOutgoingProductAPI.post("/createOutgoingProduct", data);
export const getOutgoingProductAPI = (id: string | undefined) =>
  authOutgoingProductAPI.get(`/getOutgoingProduct/${id}`);
export const updateOutgoingProductAPI = (data: object | any) =>
  authOutgoingProductAPI.put(`/updateOutgoingProduct/${data.id}`, data);
export const deleteOutgoingProductAPI = (id: string | undefined) =>
  authOutgoingProductAPI.delete(`/deleteOutgoingProduct/${id}`);
export const deliverOutgoingProductAPI = (id: string | undefined) =>
  authOutgoingProductAPI.post(`/deliverOutgoingProduct/${id}`);

// Order Product Router
export const getAllOrderedProductsAPI = (page: number | any) =>
  authOrderProductAPI.get("/getAllOrderedProducts", { params: { page: page } });
export const orderProductAPI = (data: object | any) =>
  authOrderProductAPI.post("/orderProduct", data);
export const getOrderedProductAPI = (id: string | undefined) =>
  authOrderProductAPI.get(`/getOrderedProduct/${id}`);
export const updateOrderedProductAPI = (data: object | any) =>
  authOrderProductAPI.put(`/updateOrderedProduct/${data.id}`, data);
export const deleteOrderedProductAPI = (id: string | undefined) =>
  authOrderProductAPI.delete(`/deleteOrderedProduct/${id}`);

// Daily Attendance Router
export const getAllDailyAttendanceAPI = (page: number | any) =>
  authDailyAttendanceAPI.get("/getAllDailyAttendance", {
    params: { page: page },
  });

// Returned Item Router
export const getAllReturnedItemsAPI = (page: number | any) =>
  authReturnedItemAPI.get("/getAllReturnedItems", { params: { page: page } });
export const createReturnedItemAPI = (data: object | any) =>
  authReturnedItemAPI.post("/createReturnedItem", data);
export const getReturnedItemAPI = (id: string | undefined) =>
  authReturnedItemAPI.get(`/getReturnedItem/${id}`);
export const updateReturnedItemAPI = (data: object | any) =>
  authReturnedItemAPI.put(`/updateReturnedItem/${data.id}`, data);
export const deleteReturnedItemAPI = (id: string | undefined) =>
  authReturnedItemAPI.post(`/deleteReturnedItem/${id}`);

// Barcode Generator Router
export const createBarcodeAPI = (data: object | any) =>
  authBarcodeGeneratorAPI.post("/createBarcode", data);
export const getAllBarcodesAPI = () =>
  authBarcodeGeneratorAPI.get("/getAllBarcodes");
export const deleteAllBarcodesAPI = () =>
  authBarcodeGeneratorAPI.delete("/deleteAllBarcodes");

// Store Inventory Route
export const getAllStoreInventoryAPI = (page: number | any) =>
  authStoreInventoryAPI.get("/getAllStoreInventory", {
    params: { page: page },
  });
export const getStoreProductAPI = (id: string | undefined) =>
  authStoreInventoryAPI.get(`/getStoreProduct/${id}`);
export const updateStorePriceAPI = (data: object | any) =>
  authStoreInventoryAPI.put(`/updateStorePrice/${data.id}`, data);

// Store Incoming Product Route
export const getAllStoreIncomingProductAPI = (page: number | any) =>
  authStoreIncomingProductAPI.get("/getAllStoreIncomingProduct", {
    params: { page: page },
  });
export const receivedStoreIncomingProductAPI = (id: string | undefined) =>
  authStoreIncomingProductAPI.post(`/receivedStoreIncomingProduct/${id}`);
