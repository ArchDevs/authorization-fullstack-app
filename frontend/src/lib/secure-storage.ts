// 🔐 SECURE JWT STORAGE - MODERN & SAFE APPROACH

export class SecureStorage {
  private static readonly TOKEN_KEY = "client_jwt_token"
  private static readonly REFRESH_TOKEN_KEY = "client_refresh_token"
  private static readonly USER_KEY = "client_user_data"
  private static readonly REMEMBER_ME_KEY = "client_remember_me"

  // 💾 STORE JWT TOKEN SECURELY
  static setToken(token: string, rememberMe: boolean = false) {
    try {
      if (rememberMe) {
        // Store in localStorage for persistent login
        localStorage.setItem(this.TOKEN_KEY, token)
        localStorage.setItem(this.REMEMBER_ME_KEY, "true")
      } else {
        // Store in sessionStorage (cleared when browser closes)
        sessionStorage.setItem(this.TOKEN_KEY, token)
        localStorage.removeItem(this.REMEMBER_ME_KEY)
      }
      
      console.log("🔐 Token stored securely", { rememberMe })
    } catch (error) {
      console.error("❌ Failed to store token:", error)
    }
  }

  // 🔍 GET JWT TOKEN
  static getToken(): string | null {
    try {
      // Check sessionStorage first (current session)
      let token = sessionStorage.getItem(this.TOKEN_KEY)
      
      // If not found and user chose "remember me", check localStorage
      if (!token && this.shouldRememberUser()) {
        token = localStorage.getItem(this.TOKEN_KEY)
        
        // Move token to sessionStorage for current session
        if (token) {
          sessionStorage.setItem(this.TOKEN_KEY, token)
        }
      }
      
      return token
    } catch (error) {
      console.error("❌ Failed to get token:", error)
      return null
    }
  }

  // 🗑️ CLEAR ALL TOKENS
  static clearTokens() {
    try {
      // Clear from both storages
      sessionStorage.removeItem(this.TOKEN_KEY)
      localStorage.removeItem(this.TOKEN_KEY)
      localStorage.removeItem(this.REFRESH_TOKEN_KEY)
      localStorage.removeItem(this.USER_KEY)
      localStorage.removeItem(this.REMEMBER_ME_KEY)
      
      console.log("🗑️ All tokens cleared")
    } catch (error) {
      console.error("❌ Failed to clear tokens:", error)
    }
  }

  // 👤 STORE USER DATA
  static setUserData(userData: any, rememberMe: boolean = false) {
    try {
      const userJson = JSON.stringify(userData)
      
      if (rememberMe) {
        localStorage.setItem(this.USER_KEY, userJson)
      } else {
        sessionStorage.setItem(this.USER_KEY, userJson)
      }
    } catch (error) {
      console.error("❌ Failed to store user data:", error)
    }
  }

  // 👤 GET USER DATA
  static getUserData(): any | null {
    try {
      // Check sessionStorage first
      let userData = sessionStorage.getItem(this.USER_KEY)
      
      // If not found and user chose "remember me", check localStorage
      if (!userData && this.shouldRememberUser()) {
        userData = localStorage.getItem(this.USER_KEY)
        
        // Move to sessionStorage for current session
        if (userData) {
          sessionStorage.setItem(this.USER_KEY, userData)
        }
      }
      
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      console.error("❌ Failed to get user data:", error)
      return null
    }
  }

  // 🔄 CHECK IF USER WANTS TO BE REMEMBERED
  private static shouldRememberUser(): boolean {
    try {
      return localStorage.getItem(this.REMEMBER_ME_KEY) === "true"
    } catch (error) {
      return false
    }
  }

  // 🧹 CLEANUP EXPIRED TOKENS (call this on app start)
  static cleanupExpiredTokens() {
    try {
      const token = this.getToken()
      
      if (token && this.isTokenExpired(token)) {
        console.log("🧹 Cleaning up expired token")
        this.clearTokens()
      }
    } catch (error) {
      console.error("❌ Failed to cleanup tokens:", error)
    }
  }

  // ⏰ CHECK IF TOKEN IS EXPIRED
  private static isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      return payload.exp < currentTime
    } catch (error) {
      return true // If we can't decode, consider it expired
    }
  }
}
