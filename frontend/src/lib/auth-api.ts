// 🔥 UPDATED AUTH API WITH SECURE STORAGE & REMEMBER ME

import { httpClient } from "./http-client"
import { setToken, clearToken, getToken, getUsernameFromToken } from "./jwt-utils"
import { SecureStorage } from "./secure-storage"
import { API_CONFIG, type LoginRequest, type RegisterRequest, type BackendResponse } from "./config"

// 🚀 LOGIN WITH REMEMBER ME SUPPORT
export async function signIn(username: string, password: string, rememberMe: boolean = false) {
  try {
    const loginData: LoginRequest = {
      username,
      password,
    }

    console.log("🔐 Attempting login for username:", username, { rememberMe })

    const response = await httpClient.post<BackendResponse>(API_CONFIG.ENDPOINTS.LOGIN, loginData, false)

    console.log("📥 Login response:", response)

    if (response.status === "success" && response.message) {
      // ✅ SUCCESS - response.message contains the JWT token
      const jwtToken = response.message
      
      // 🔐 STORE TOKEN SECURELY WITH REMEMBER ME PREFERENCE
      setToken(jwtToken, rememberMe)

      // Extract user info from token and store it
      const usernameFromToken = getUsernameFromToken(jwtToken)
      if (usernameFromToken) {
        const userData = { 
          username: usernameFromToken,
          loginTime: new Date().toISOString(),
          rememberMe 
        }
        SecureStorage.setUserData(userData, rememberMe)
      }

      return {
        success: true,
        message: "Login successful!",
        user: { username: usernameFromToken },
        token: jwtToken,
      }
    }

    // ❌ FAILURE
    return {
      success: false,
      message: getErrorMessage(response.message),
    }
  } catch (error: any) {
    console.error("❌ Login error:", error)
    return {
      success: false,
      message: error.message || "Network error. Please try again.",
    }
  }
}

// 🚀 REGISTER (unchanged)
export async function signUp(username: string, email: string, password: string) {
  try {
    const registerData: RegisterRequest = {
      username,
      email,
      password,
    }

    console.log("📝 Attempting registration for username:", username)

    const response = await httpClient.post<BackendResponse>(API_CONFIG.ENDPOINTS.REGISTER, registerData, false)

    console.log("📥 Register response:", response)

    if (response.status === "success") {
      return {
        success: true,
        message: "Account created successfully!",
      }
    }

    return {
      success: false,
      message: getErrorMessage(response.message),
    }
  } catch (error: any) {
    console.error("❌ Register error:", error)
    return {
      success: false,
      message: error.message || "Network error. Please try again.",
    }
  }
}

// 🔤 ERROR MESSAGE TRANSLATION
function getErrorMessage(backendMessage: string): string {
  const errorMessages: Record<string, string> = {
    user_exists: "Username already exists. Please choose a different username.",
    user_not_authorized: "Invalid username or password.",
    auth_failed: "Authentication failed. Please check your credentials.",
    user_created: "Account created successfully!",
  }

  return errorMessages[backendMessage] || backendMessage || "An error occurred."
}

// 🔐 SECURE LOGOUT
export async function logout() {
  try {
    console.log("🚪 Logging out user...")
    
    // Optional: Call backend logout endpoint if you implement it
    // await httpClient.post(API_CONFIG.ENDPOINTS.LOGOUT)
    
    // Clear all stored data
    SecureStorage.clearTokens()
    
    // Redirect to home
    window.location.href = "/"
  } catch (error) {
    console.error("❌ Logout error:", error)
    // Still clear tokens even if backend call fails
    SecureStorage.clearTokens()
    window.location.href = "/"
  }
}

// 👤 GET CURRENT USER WITH SECURE STORAGE
export function getCurrentUser() {
  try {
    const token = getToken()
    if (!token) return null

    // Get user from secure storage
    const storedUser = SecureStorage.getUserData()
    if (storedUser) {
      return storedUser
    }

    // Fallback: get username from token
    const username = getUsernameFromToken(token)
    return username ? { username } : null
  } catch (error) {
    console.error("❌ Get current user error:", error)
    return null
  }
}

// 🔍 CHECK AUTH STATUS
export function isAuthenticated(): boolean {
  const token = getToken()
  return !!token
}

// 🧹 INITIALIZE AUTH SYSTEM (call this on app start)
export function initializeAuth() {
  console.log("🚀 Initializing secure auth system...")
  
  // Cleanup any expired tokens
  SecureStorage.cleanupExpiredTokens()
  
  // Log current auth status
  const isAuth = isAuthenticated()
  const user = getCurrentUser()
  
  console.log("🔍 Auth status:", { 
    isAuthenticated: isAuth, 
    user: user?.username,
    rememberMe: SecureStorage.getUserData()?.rememberMe 
  })
}

// 👤 GET USER PROFILE (example protected endpoint)
export async function getUserProfile() {
  try {
    const response = await httpClient.get(API_CONFIG.ENDPOINTS.PROFILE)
    return {
      success: true,
      data: response,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
}
