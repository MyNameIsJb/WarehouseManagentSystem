import axios from "axios";

// Base API that dont require token
const userAPI = axios.create({
  baseURL: "http://localhost:8080/user",
});

// Base API that require token
const authUserAPI = axios.create({
  baseURL: "http://localhost:8080/user",
});
const authProductAPI = axios.create({
  baseURL: "http://localhost:8080/product",
});
const authGalleryAPI = axios.create({
  baseURL: "http://localhost:8080/gallery",
});
const authSaleAPI = axios.create({
  baseURL: "http://localhost:8080/sale",
});
const authPurchaseAPI = axios.create({
  baseURL: "http://localhost:8080/purchase",
});
const authIncomingProductAPI = axios.create({
  baseURL: "http://localhost:8080/incomingProduct",
});
const authOutgoingProductAPI = axios.create({
  baseURL: "http://localhost:8080/outgoingProduct",
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
