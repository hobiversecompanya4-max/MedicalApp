export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  const user = localStorage.getItem("user");

  if (!user || user === "undefined" || user === "null") {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch (error) {
    console.error("Invalid user data in localStorage");
    localStorage.removeItem("user");
    return null;
  }
};

export const isLoggedIn = () => {
  return Boolean(getToken());
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};