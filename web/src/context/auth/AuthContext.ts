import React from 'react'

interface AuthContext {
   isAuthenticated: boolean,
   isLoading: boolean,
   handleLogin(email: string, password: string): Promise<void>
}

export default React.createContext<AuthContext>({} as AuthContext)