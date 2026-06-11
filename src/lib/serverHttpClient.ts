// import { env } from "./config";

// export interface ServerApiResponse<T = unknown> {
//   success: boolean;
//   data: T;
//   message?: string;
// }

// const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

// async function getAuthHeaders() {
//   const { headers } = await import("next/headers");
//   const headersList = await headers();
//   const cookie = headersList.get("cookie") ?? "";
//   return { cookie };
// }

// async function request<T>(
//   url: string,
//   options: RequestInit = {},
// ): Promise<ServerApiResponse<T>> {
//   const authHeaders = await getAuthHeaders();

//   const response = await fetch(`${BACKEND_URL}/api/v1${url}`, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//       ...authHeaders,
//       ...options.headers,
//     },
//     cache: "no-store",
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     console.error(`API Error: ${response.status} - ${response.statusText}`, data);
//     throw new Error(data?.message || `HTTP ${response.status}`);
//   }

//   return data;
// }

// export const serverApi = {
//   get: <T,>(url: string) => request<T>(url, { method: "GET" }),

//   post: <T,>(url: string, body?: unknown) =>
//     request<T>(url, {
//       method: "POST",
//       body: body ? JSON.stringify(body) : undefined,
//     }),

//   put: <T,>(url: string, body?: unknown) =>
//     request<T>(url, {
//       method: "PUT",
//       body: body ? JSON.stringify(body) : undefined,
//     }),

//   patch: <T,>(url: string, body?: unknown) =>
//     request<T>(url, {
//       method: "PATCH",
//       body: body ? JSON.stringify(body) : undefined,
//     }),

//   delete: <T,>(url: string) => request<T>(url, { method: "DELETE" }),
// };


import { env } from "./config";

export interface ServerApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

async function getAuthHeaders(): Promise<Record<string, string>> {
  try {
    const { headers } = await import("next/headers");
    const headersList = await headers();

    const cookie = headersList.get("cookie") || headersList.get("Cookie") || "";

    return cookie ? { cookie } : {};
  } catch (error) {
    console.error("Failed to fetch server headers:", error);
    return {};
  }
}

async function request<T>(
  url: string,
  options: RequestInit = {},
): Promise<ServerApiResponse<T>> {
  const authHeaders = await getAuthHeaders();

  const incomingHeaders = options.headers
    ? Object.fromEntries(new Headers(options.headers).entries())
    : {};

  const response = await fetch(`${BACKEND_URL}/api/v1${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...incomingHeaders,
    },
    cache: "no-store",
  });

  
  const contentType = response.headers.get("content-type");
  let data: any = {};
  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = { message: await response.text() };
  }

  if (!response.ok) {
    console.error(`API Error: ${response.status} - ${response.statusText}`, data);
    throw new Error(data?.message || `HTTP ${response.status}`);
  }

  return data;
}

export const serverApi = {
  get: <T,>(url: string, options?: RequestInit) =>
    request<T>(url, { method: "GET", ...options }),

  post: <T,>(url: string, body?: unknown, options?: RequestInit) =>
    request<T>(url, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),

  put: <T,>(url: string, body?: unknown, options?: RequestInit) =>
    request<T>(url, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),

  patch: <T,>(url: string, body?: unknown, options?: RequestInit) =>
    request<T>(url, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),

  delete: <T,>(url: string, options?: RequestInit) =>
    request<T>(url, { method: "DELETE", ...options }),
};