"use client"

import { useState, useEffect } from "react"
import { getCurrentUser, logout as logoutApi, isAuthenticated } from "@/lib/auth-api"
import { getToken, isTokenExpired } from "@/lib/jwt-utils"

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = getToken()

        if (!token || isTokenExpired(token)) {
          setUser(null)
          setLoading(false)
          return
        }

        const currentUser = getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error("Auth check error:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Check auth status periodically
    const interval = setInterval(checkAuth, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  const logout = async () => {
    try {
      await logoutApi()
      setUser(null)
    } catch (error) {
      console.error("Logout error:", error)
      setUser(null)
    }
  }

  const updateUser = (userData: any) => {
    setUser(userData)
    localStorage.setItem("client_user", JSON.stringify(userData))
  }

  return {
    user,
    loading,
    isAuthenticated: isAuthenticated() && !!user,
    logout,
    updateUser,
  }
}
