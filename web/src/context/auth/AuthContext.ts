import { createContext } from 'react'

interface AuthContext {
   isAuthenticated: boolean,
   isLoading: boolean,
   handleLogin(email: string, password: string, isToRememberUser: boolean): Promise<void>
}

export default createContext<AuthContext>({} as AuthContext)