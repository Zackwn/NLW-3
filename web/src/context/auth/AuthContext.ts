import { createContext } from 'react'

export type UserRole = "admin" | "user"

interface AuthContext {
   isAuthenticated: boolean,
   isAdmin: boolean,
   isLoading: boolean,
   handleLogin(email: string, password: string, isToRememberUser: boolean): Promise<UserRole>
}

export default createContext<AuthContext>({} as AuthContext)