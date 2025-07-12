// 🔐 JWT UTILITIES - SIMPLIFIED FOR YOUR BACKEND

import { SecureStorage } from "./secure-storage"
import { API_CONFIG } from "./config"

export interface JWTPayload {
  sub: string // Your JWT uses 'sub' for username
  iat: number // Issued at
  exp: number // Expires at
}

// 💾 TOKEN STORAGE - NOW USING SECURE STORAGE
export function setToken(token: string, rememberMe: boolean = false) {
  SecureStorage.setToken(token, rememberMe)
}

export function getToken(): string | null {
  return SecureStorage.getToken()
}

// Alternative function names for compatibility
export function getAccessToken(): string | null {
  return getToken()
}

export function clearToken() {
  SecureStorage.clearTokens()
}

// 📝 DECODE JWT (matches your backend structure)
export function decodeJWT(token: string): JWTPayload | null {
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Error decoding JWT:", error)
    return null
  }
}

// ⏰ CHECK TOKEN EXPIRATION
export function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token)
  if (!payload) return true

  const currentTime = Math.floor(Date.now() / 1000)
  return payload.exp < currentTime
}

// 👤 GET USERNAME FROM TOKEN
export function getUsernameFromToken(token: string): string | null {
  const payload = decodeJWT(token)
  return payload?.sub || null
}

// ⏰ CHECK IF TOKEN EXPIRES SOON (for auto-refresh)
export function isTokenExpiringSoon(token: string): boolean {
  const payload = decodeJWT(token)
  if (!payload) return true

  const currentTime = Date.now()
  const expiryTime = payload.exp * 1000
  return expiryTime - currentTime < API_CONFIG.JWT.EXPIRY_BUFFER
}

// 🔄 AUTO-REFRESH TOKEN IF NEEDED
export async function ensureValidToken(): Promise<string | null> {
  const token = getToken()
  
  if (!token) {
    console.log("🔍 No token found")
    return null
  }

  if (isTokenExpired(token)) {
    console.log("⏰ Token expired, clearing...")
    clearToken()
    return null
  }

  if (isTokenExpiringSoon(token)) {
    console.log("⚠️ Token expiring soon, should refresh...")
    // TODO: Implement token refresh logic with your backend
    // For now, just return the current token
  }

  return token
}
