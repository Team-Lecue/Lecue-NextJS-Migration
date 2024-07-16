import axios, { AxiosInstance } from "axios";

let apiInstance: AxiosInstance | null;

export const api = () => {
  if (!apiInstance) {
    apiInstance = axios.create({
      baseURL: process.env.APP_BASE_URL,
    });
  }

  let token;

  if (typeof window !== "undefined") {
    token = sessionStorage.getItem("token");
  }

  if (token) {
    const headerToken = apiInstance.defaults.headers.common.Authorization;

    if (!headerToken || token !== headerToken.toString().split(" ")[1]) {
      apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  return apiInstance;
};
