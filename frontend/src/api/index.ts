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

//Route that dont require token
export const signInAPI = (data: object) => userAPI.post("/signIn", data);
export const forgotPasswordAPI = (data: object) =>
  userAPI.post("/forgotPassword", data);
export const resetPasswordAPI = (data: object) =>
  userAPI.post("/resetPassword", data);
export const createPasswordAPI = (data: object) =>
  userAPI.post("/createPassword", data);

//Route that require token
// Employee List Route
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

// Product List Route
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

// Gallery Route
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
