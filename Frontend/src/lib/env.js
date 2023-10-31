
export const API_URL = import.meta.env.VITE_MODE === "DEVELOPMENT"
    ? import.meta.env.VITE_LOCAL_API
    : import.meta.env.VITE_PROD_API

export const SOCKET_URL = import.meta.env.VITE_MODE === "DEVELOPMENT"
    ? import.meta.env.VITE_LOCAL_SOCKET
    : import.meta.env.VITE_PROD_SOCKET