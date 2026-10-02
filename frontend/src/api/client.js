/**
 * Central Axios instance.
 *
 * - Injects the JWT on every request.
 * - Normalises errors into a predictable shape for the UI.
 * - Redirects to /login on 401 (token expired).
 */

import axios from "axios";
import { API_BASE_URL, STORAGE_KEYS } from "@/config/constants";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

/* ---------------- Request interceptor ---------------- */
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ---------------- Response interceptor ---------------- */
client.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const payload = error.response?.data;

    // Token expired / invalid → clear session and bounce to login.
    if (status === 401) {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);

      const onAuthPage = ["/login", "/register"].includes(
        window.location.pathname
      );
      if (!onAuthPage) {
        window.location.href = "/login";
      }
    }

    // Uniform error object for every consumer.
    const normalised = {
      status: status ?? 0,
      message:
        payload?.error?.message ||
        payload?.detail ||
        error.message ||
        "Something went wrong. Please try again.",
      details: payload?.error?.details ?? null,
      isNetworkError: !error.response,
    };

    return Promise.reject(normalised);
  }
);

export default client;