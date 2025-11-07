import { CONFIG } from "@/config/config";
import axios from "axios";

const api = axios.create({
  baseURL: CONFIG.API_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": undefined,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Timeout error");
    }

    return Promise.reject(error);
  }
);

const sanctum = axios.create({
  baseURL: CONFIG.SANCTUM_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": undefined,
  },
});

export { api, sanctum };
