import axios from "axios";
import baseurl from "./url";
const API = axios.create({ baseURL: `${baseurl}/admin` });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = localStorage.getItem("token");
  }
  return req;
});

export const getusers = (query) => API.get(`/users?${query}`);
export const suspendusers = (ids) => API.post("/suspend", ids);
export const deleteusers = (ids) => API.post("/delete", ids);
export const dashboardcounts = () => API.get("/dashboard-counts");
export const dashboard = (query) => API.get(`/dashboard?${query}`);
