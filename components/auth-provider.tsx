"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Role = "Super Admin" | "Book Organizer" | "Annotator" | "Reviewer"

interface User {
  email: string
  role: Role
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const dummyUsers = [
  { email: "superadmin@example.com", password: "password", role: "Super Admin" as Role },
  { email: "bookorganizer@example.com", password: "password", role: "Book Organizer" as Role },
  { email: "annotator@example.com", password: "password", role: "Annotator" as Role },
  { email: "reviewer@example.com", password: "password", role: "Reviewer" as Role },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (email: string, password: string) => {
    const foundUser = dummyUsers.find((u) => u.email === email && u.password === password)
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    console.log("User logged out")
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

