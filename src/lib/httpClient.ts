// /* eslint-disable @typescript-eslint/no-explicit-any */
// import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// export interface ApiResponse<T = any> {
//   success: boolean;
//   data: T;
//   message?: string;
// }

// const baseURL = process.env.NEXT_PUBLIC_API_URL;

// const axiosInstance: AxiosInstance = axios.create({
//   baseURL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // axiosInstance.interceptors.request.use((config) => {
// //   if (typeof window !== "undefined") {
// //     const cookieMatch = document.cookie.match(
// //       /better-auth\.session_token=([^;]+)/,
// //     );
// //     if (cookieMatch) {
// //       config.headers.Authorization = `Bearer ${cookieMatch[1]}`;
// //     }
// //   }
// //   return config;
// // });
// axiosInstance.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const getCookie = (name: string) => {
//       const value = `; ${document.cookie}`;
//       const parts = value.split(`; ${name}=`);
//       if (parts.length === 2) return parts.pop()?.split(";").shift();
//     };

//     const sessionToken = getCookie("better-auth.session_token");

//     if (sessionToken) {
//       config.headers.Authorization = `Bearer ${sessionToken}`;
//     }
//   }
//   return config;
// });
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       if (typeof window !== "undefined") {
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   },
// );

// export const api = {
//   get: <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
//     axiosInstance.get(url, config).then((res) => res.data),

//   post: <T>(
//     url: string,
//     data?: any,
//     config?: AxiosRequestConfig,
//   ): Promise<ApiResponse<T>> =>
//     axiosInstance.post(url, data, config).then((res) => res.data),

//   put: <T>(
//     url: string,
//     data?: any,
//     config?: AxiosRequestConfig,
//   ): Promise<ApiResponse<T>> =>
//     axiosInstance.put(url, data, config).then((res) => res.data),

//   patch: <T>(
//     url: string,
//     data?: any,
//     config?: AxiosRequestConfig,
//   ): Promise<ApiResponse<T>> =>
//     axiosInstance.patch(url, data, config).then((res) => res.data),

//   delete: <T>(
//     url: string,
//     config?: AxiosRequestConfig,
//   ): Promise<ApiResponse<T>> =>
//     axiosInstance.delete(url, config).then((res) => res.data),
// };

// export default axiosInstance;
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

const baseURL = typeof window !== "undefined"
  ? "/api/v1"
  : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1");

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (typeof window === "undefined") {
      try {
        const { headers } = await import("next/headers");
        const headersList = await headers();
        const cookie = headersList.get("cookie") || headersList.get("Cookie") || "";
        if (cookie) {
          if (config.headers.set) {
            config.headers.set("cookie", cookie);
          } else {
            config.headers["cookie"] = cookie;
          }
        }
      } catch (error) {
        console.error("Failed to inject cookies to Axios on server:", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> =>
    axiosInstance.get(url, config).then((res) => res.data),

  post: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> =>
    axiosInstance.post(url, data, config).then((res) => res.data),

  put: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> =>
    axiosInstance.put(url, data, config).then((res) => res.data),

  patch: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> =>
    axiosInstance.patch(url, data, config).then((res) => res.data),

  delete: <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> =>
    axiosInstance.delete(url, config).then((res) => res.data),
};

export default axiosInstance;