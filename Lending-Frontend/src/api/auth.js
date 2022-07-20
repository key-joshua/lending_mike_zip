import axios from "axios";
import baseurl from "./url";
const API = axios.create({ baseURL: `${baseurl}/auth` });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = localStorage.getItem("token");
  }
  return req;
});

export const login = (formData) => API.post("/login", formData);
export const signUp = (formData) => API.post("/register", formData);

export const changepassword = (formdata) =>
  API.put("/change-password", formdata);

export const updatepfp = (formdata) => API.put("/update-pfp", formdata);
export const updateprofile = (formdata) => API.put("/update-profile", formdata);
export const forgotpassword = (formdata) =>
  API.post("/forgot-password", formdata);

export const resetpassword = (formdata) =>
  API.post("/reset-password", formdata);
