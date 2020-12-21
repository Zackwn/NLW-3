import React, { useEffect, useState } from 'react'

import AuthContext, { UserRole } from './AuthContext'

import api from '../../services/api'
import useLocalStorage from '../../hooks/useLocalStorage'

const AuthProvider: React.FC = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [isAdmin, setIsAdmin] = useState(false)
   const [token, setToken] = useLocalStorage<string | null>('token', null)

   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      async function refreshToken() {
         if (token) {
            try {
               const response = await api.post('/user/refresh-token', {}, {
                  headers: {
                     authorization: `Bearer ${token}`
                  }
               })

               const { token: newToken, userRole } = response.data

               api.defaults.headers['authorization'] = `Bearer ${newToken}`
               setIsAuthenticated(true)
               setToken(newToken, true)

               if (userRole === "admin") {
                  setIsAdmin(true)
               }
            } catch (error) {
               setToken(null, true)
               api.defaults.headers['authorization'] = undefined
            }
         }

         setIsLoading(false)
      }

      refreshToken()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   async function handleLogin(email: string, password: string, isToRememberUser: boolean): Promise<UserRole> {
      const response = await api.post('/user/login', {
         email, password
      })

      // if an error happen axios will throw it, making the code below not being executed
      const { token, userRole } = response.data
      console.log({ token, userRole })

      api.defaults.headers['authorization'] = `Bearer ${token}`
      setToken(token, isToRememberUser)
      setIsAuthenticated(true)

      if (userRole === "admin") {
         setIsAdmin(true)
      }

      return userRole
   }

   return (
      <AuthContext.Provider
         value={{
            handleLogin,
            isAuthenticated,
            isAdmin,
            isLoading
         }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider