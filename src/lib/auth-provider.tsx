"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  fullName: string
  image?: string
  provider?: string
  emailVerified?: Date | null
  createdAt: Date
  updatedAt: Date
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log("[v0] AuthProvider: Loading stored auth data")
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("token")

    console.log("[v0] Stored user:", storedUser)
    console.log("[v0] Stored token:", storedToken)

    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setToken(storedToken)
        console.log("[v0] Auth state restored:", { user: userData, token: storedToken })
      } catch (error) {
        console.error("Error parsing stored user data:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
      }
    }

    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const result = await response.json()
    console.log("[v0] Login response:", result)

    if (!response.ok) {
      throw new Error(result.error || "Login failed")
    }

    const userData = result.data.user
    const userToken = result.data.token || result.data.token

    console.log("[v0] Setting auth data:", { user: userData, token: userToken })

    setUser(userData)
    setToken(userToken)
    localStorage.setItem("user", JSON.stringify(userData))
    localStorage.setItem("token", userToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    fetch("/api/auth/logout", {
      method: "POST",
    }).catch(console.error)
  }

  const value = {
    user,
    token,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user && !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Protected route component
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user, token } = useAuth()
  const router = useRouter()

  console.log("[v0] ProtectedRoute check:", { isAuthenticated, isLoading, hasUser: !!user, hasToken: !!token })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    console.log("[v0] Not authenticated, redirecting to signin")
    router.push("/signin")
    return null
  }

  console.log("[v0] User is authenticated, rendering protected content")
  return <>{children}</>
}
