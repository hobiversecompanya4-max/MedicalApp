const API_URL = import.meta.env.VITE_API_URL;

const getAdminToken = () => {
  return localStorage.getItem("adminToken");
};

const apiRequest = async (endpoint, options = {}) => {
  const isFormData = options.body instanceof FormData;

  const adminToken = getAdminToken();

  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };

  if (adminToken && !headers.Authorization) {
    headers.Authorization = `Bearer ${adminToken}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

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
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  patch: (endpoint, body, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: "PATCH",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  put: (endpoint, body, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  delete: (endpoint, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: "DELETE",
    }),
};

export const registerUser = (userData) => {
  return api.post("/auth/register", userData);
};

export const loginUser = (credentials) => {
  return api.post("/auth/login", credentials);
};

export const getUserProfile = (token) => {
  return api.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserProfile = (token, userData) => {
  return api.patch("/users/profile", userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const loginAdmin = (credentials) => {
  return api.post("/auth/admin/login", credentials);
};

export const getAdminProfile = (token) => {
  return api.get("/admin/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default api;