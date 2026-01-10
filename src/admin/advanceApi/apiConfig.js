export const isDevelopment = import.meta.env.MODE === 'development';
export const isProduction = import.meta.env.MODE === 'production';

export const API_CONFIG = {
  development: {
    baseURL: import.meta.env.REACT_APP_DEV_API_URL || 'http://localhost:5000/api',
    timeout: 30000,
  },
  production: {
    baseURL: import.meta.env.REACT_APP_PROD_API_URL || 'https://elmech-backend.vercel.app/api',
    timeout: 30000,
  },
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'El_Jwt_accessToken',
  REFRESH_TOKEN: 'El_Jwt_refreshToken',
  USER_INFO: 'El_User_Info',
};
export const getApiBaseUrl = () => {
  return isDevelopment ? API_CONFIG.development.baseURL : API_CONFIG.production.baseURL;
};

export const getApiTimeout = () => {
  return isDevelopment ? API_CONFIG.development.timeout : API_CONFIG.production.timeout;
};
export const getAccessToken = () => {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};
export const getRefreshToken = () => {
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

export const setAccessToken = (token) => {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
};

export const clearAuthData = () => {
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER_INFO);
};

export const generateRequestId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
