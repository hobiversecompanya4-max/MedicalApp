import { API_URL } from "../config";
import { getAdminToken, getToken } from "./auth";

const getStoredToken = () => getAdminToken() || getToken();

const apiRequest = async (endpoint, options = {}) => {
  const isFormData =
    typeof FormData !== "undefined" &&
    options.body instanceof FormData;

  const headers = {
    ...(isFormData
      ? {}
      : {
          "Content-Type": "application/json",
        }),
    ...(options.headers || {}),
  };

  // Automatically attach stored authentication token.
  if (!headers.Authorization) {
    const token = getStoredToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const url = `${API_URL}${endpoint}`;

  console.log(`API ${options.method || "GET"}:`, url);

  let response;

  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (error) {
    console.error("Network error:", error);

    throw new Error(
      "Unable to connect to the server. Please check your internet connection or try again."
    );
  }

  const rawText = await response.text();

  let data;

  try {
    data = rawText ? JSON.parse(rawText) : {};
  } catch {
    data = {
      message: rawText || "Unexpected server response",
    };
  }

  if (!response.ok) {
    throw new Error(
      data.message ||
        `Something went wrong (${response.status})`
    );
  }

  return data;
};

/* ------------------------- API client ------------------------- */

export const api = {
  get: (endpoint, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: "GET",
    }),

  post: (endpoint, body, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: "POST",
      body:
        body instanceof FormData
          ? body
          : JSON.stringify(body),
    }),

  patch: (endpoint, body, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: "PATCH",
      body:
        body instanceof FormData
          ? body
          : JSON.stringify(body),
    }),

  put: (endpoint, body, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: "PUT",
      body:
        body instanceof FormData
          ? body
          : JSON.stringify(body),
    }),

  delete: (endpoint, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: "DELETE",
    }),
};

/* ------------------------- Auth helpers ------------------------- */

export const registerUser = (userData) =>
  api.post("/auth/register", userData);

export const loginUser = (credentials) =>
  api.post("/auth/login", credentials);

export const loginAdmin = (credentials) =>
  api.post("/auth/admin/login", credentials);

export const getUserProfile = (token) =>
  api.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateUserProfile = (token, userData) =>
  api.patch("/users/profile", userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export default api;