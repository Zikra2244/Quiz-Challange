import axios from "axios";
import { API_BASE_URL, API_TIMEOUT } from "../utils/constants";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      _t: Date.now(),
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 429 && !originalRequest._retry) {
      originalRequest._retry = true;

      const retryAfter = error.response.headers["retry-after"]
        ? parseInt(error.response.headers["retry-after"]) * 1000
        : 5000;

      await new Promise((resolve) => setTimeout(resolve, retryAfter));
      return apiClient(originalRequest);
    }

    if (error.code === "ECONNABORTED") {
      console.error("Request timeout");
      return Promise.reject(new Error("Koneksi timeout. Silakan coba lagi."));
    }

    if (!error.response) {
      console.error("Network error");
      return Promise.reject(new Error("Koneksi internet bermasalah."));
    }

    return Promise.reject(error);
  },
);

export default apiClient;
