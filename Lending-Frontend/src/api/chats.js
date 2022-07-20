import url from "./url";
import axios from "axios";
const API = axios.create({ baseURL: `${url}/chats` });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = localStorage.getItem("token");
  }
  return req;
});

export const getnewchat = (options) => API.post(`/`, options);
