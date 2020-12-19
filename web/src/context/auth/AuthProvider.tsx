import React, { useEffect, useState } from 'react'

import AuthContext from './AuthContext'

import api from '../../services/api'
import useLocalStorage from '../../hooks/useLocalStorage'

const AuthProvider: React.FC = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [token, setToken] = useLocalStorage<string | null>('token', null)

   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      async function refreshToken() {
         if (token) {
            api.defaults.headers['authorization'] = `Bearer ${token}`
            setIsAuthenticated(true)
         }

         setIsLoading(false)
      }

      refreshToken()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   async function handleLogin(email: string, password: string, isToRememberUser: boolean): Promise<void> {
      const response = await api.post('/user/login', {
         email, password
      })

      if (response.status === 200) {
         const responseToken = response.data
         console.log({ responseToken })
         api.defaults.headers['authorization'] = `Bearer ${responseToken}`
         setToken(responseToken, isToRememberUser)
         setIsAuthenticated(true)
      } else {
         // alert user
         alert('Erro!')
      }
   }

   return (
      <AuthContext.Provider
         value={{
            handleLogin,
            isAuthenticated,
            isLoading
         }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider