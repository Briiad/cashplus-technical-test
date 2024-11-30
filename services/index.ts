import axios from "axios";
import { constants } from "@/constants";

const API = axios.create({ baseURL: process.env.NEXT_API_URL || "https://bluute.vercel.app/api/v1" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem(constants.ACCESS_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;