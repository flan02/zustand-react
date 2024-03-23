import axios, { InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../store/auth";
// We configured axios

const authApi = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,  // * enables sending headers with cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// * this is a middleware, it will add the token to the headers of every request
authApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  //const token = localStorage.getItem("token");
  const token = useAuthStore.getState().token
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})

export default authApi;
