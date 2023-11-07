import { LocalStorageItem } from "../types/LocalStorageItem";
import axios from "axios";

export function initializeAxios(logout?: () => void) {
  axios.interceptors.request.use((req) => {
    const token = localStorage.getItem(LocalStorageItem.token);
    if (token && req.headers) {
      req.headers.Authorization =
        req.headers.Authorization || `Bearer ${token}`;
    }
    return req;
  });

  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401 && logout) {
        logout();
        return;
      }

      throw err;
    }
  );
}
