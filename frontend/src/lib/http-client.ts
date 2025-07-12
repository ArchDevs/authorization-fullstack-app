// 🌐 HTTP CLIENT - SIMPLIFIED FOR YOUR BACKEND

import { API_CONFIG } from "./config"
import { getToken, clearToken, isTokenExpired } from "./jwt-utils"

class HttpClient {
  private baseURL: string

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL
  }

  // 🔧 PREPARE REQUEST HEADERS
  private getHeaders(includeAuth = true): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (includeAuth) {
      const token = getToken()
      if (token && !isTokenExpired(token)) {
        headers["Authorization"] = `${API_CONFIG.JWT.HEADER_PREFIX}${token}`
      }
    }

    return headers
  }

  // 🚀 MAKE REQUEST
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    includeAuth = true
  ): Promise<T> {
    try {
      const url = `${this.baseURL}${endpoint}`
      const headers = this.getHeaders(includeAuth)

      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      })

      // Handle 401 Unauthorized
      if (response.status === 401 && includeAuth) {
        clearToken()
        window.location.href = "/auth/signin"
        throw new Error("Unauthorized")
      }

      // Handle non-JSON responses
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        return {} as T
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.error || `HTTP ${response.status}`)
      }

      return data
    } catch (error) {
      console.error("HTTP Request failed:", error)
      throw error
    }
  }

  // 📤 HTTP METHODS
  async get<T>(endpoint: string, includeAuth = true): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: "GET" }, includeAuth)
  }

  async post<T>(endpoint: string, body?: any, includeAuth = true): Promise<T> {
    return this.makeRequest<T>(
      endpoint,
      {
        method: "POST",
        body: body ? JSON.stringify(body) : undefined,
      },
      includeAuth
    )
  }

  async put<T>(endpoint: string, body?: any, includeAuth = true): Promise<T> {
    return this.makeRequest<T>(
      endpoint,
      {
        method: "PUT",
        body: body ? JSON.stringify(body) : undefined,
      },
      includeAuth
    )
  }

  async delete<T>(endpoint: string, includeAuth = true): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: "DELETE" }, includeAuth)
  }
}

export const httpClient = new HttpClient()
