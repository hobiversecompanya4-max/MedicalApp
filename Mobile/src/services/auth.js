import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Drop-in replacement for the web app's localStorage-based auth service
 * (Frontend/src/services/auth.js) using AsyncStorage with an in-memory cache
 * so synchronous reads still work after the initial loadAuthState().
 */

const TOKEN_KEY = "token";
const USER_KEY = "user";
const ADMIN_TOKEN_KEY = "adminToken";
const ADMIN_KEY = "admin";

let cachedToken = null;
let cachedUser = null;
let cachedAdminToken = null;
let cachedAdmin = null;

const parseUser = (raw) => {
  if (!raw || raw === "undefined" || raw === "null") return null;
  try {
    return JSON.parse(raw);
  } catch {
    AsyncStorage.removeItem(USER_KEY);
    return null;
  }
};

/** Must be called once at app startup to hydrate the in-memory cache. */
export const loadAuthState = async () => {
  try {
    const [token, user, adminToken, admin] = await Promise.all([
      AsyncStorage.getItem(TOKEN_KEY),
      AsyncStorage.getItem(USER_KEY),
      AsyncStorage.getItem(ADMIN_TOKEN_KEY),
      AsyncStorage.getItem(ADMIN_KEY),
    ]);
    cachedToken = token;
    cachedUser = parseUser(user);
    cachedAdminToken = adminToken;
    cachedAdmin = parseUser(admin);
  } catch (error) {
    console.error("Failed to load auth state:", error);
  }
};

export const getToken = () => cachedToken;
export const getUser = () => cachedUser;
export const isLoggedIn = () => Boolean(cachedToken);

export const getAdminToken = () => cachedAdminToken;
export const getAdmin = () => cachedAdmin;
export const isAdminLoggedIn = () => Boolean(cachedAdminToken);

export const setAuth = async (token, user) => {
  cachedToken = token;
  cachedUser = user;
  await AsyncStorage.multiSet([
    [TOKEN_KEY, token],
    [USER_KEY, JSON.stringify(user)],
  ]);
};

export const setAdminAuth = async (token, admin) => {
  cachedAdminToken = token;
  cachedAdmin = admin;
  await AsyncStorage.multiSet([
    [ADMIN_TOKEN_KEY, token],
    [ADMIN_KEY, JSON.stringify(admin)],
  ]);
};

export const logout = async () => {
  cachedToken = null;
  cachedUser = null;
  await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
};

export const logoutAdmin = async () => {
  cachedAdminToken = null;
  cachedAdmin = null;
  await AsyncStorage.multiRemove([ADMIN_TOKEN_KEY, ADMIN_KEY]);
};