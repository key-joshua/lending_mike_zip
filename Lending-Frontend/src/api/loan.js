import url from "./url";
import axios from "axios";
const API = axios.create({ baseURL: `${url}/loans` });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = localStorage.getItem("token");
  }
  return req;
});

export const getloans = (options) => API.get(`?${options}`);
export const createloan = (body) => API.post("/", body);
export const grantloan = (id) => API.put(`/${id}`);
export const getloanbyId = (id) => API.get(`/${id}`);
export const deleteloan = (id) => API.delete(`/${id}`);
