// 🔧 UPDATED CONFIG TO MATCH YOUR BACKEND EXACTLY

export const API_CONFIG = {
  // 🌐 YOUR BACKEND URL
  BASE_URL: "http://localhost:8080", // ← Change this to your backend URL

  // 🛣️ API ENDPOINTS - MATCHING YOUR CONTROLLER
  ENDPOINTS: {
    LOGIN: "/api/v1/auth/login", // ← Your exact endpoint
    REGISTER: "/api/v1/auth/register", // ← Your exact endpoint
    LOGOUT: "/api/auth/logout", // ← Optional logout endpoint
    PROFILE: "/api/user/profile", // ← Your user profile endpoint
  },

  // 💾 STORAGE KEYS
  STORAGE: {
    TOKEN: "client_jwt_token",
    USER: "client_user_data",
  },

  // ⚙️ JWT SETTINGS
  JWT: {
    HEADER_PREFIX: "Bearer ",
    EXPIRY_BUFFER: 5 * 60 * 1000,
  },
}

// 🎯 REQUEST INTERFACES - MATCHING YOUR BACKEND
export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

// Update the response interfaces to match your exact backend format:

export interface BackendResponse {
  status: "success" | "error"
  message: string // For success: JWT token, For error: error code
}

// Remove the old interfaces and replace with:
export interface AuthSuccessResponse {
  status: "success"
  message: string // JWT token
}

export interface AuthErrorResponse {
  status: "error"
  message: string // Error code like "user_exists"
}
