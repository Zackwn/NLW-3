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
            const { data: newToken, status } = await api.post('/user/refresh-token', {}, {
               headers: {
                  authorization: `Bearer ${token}`
               }
            })
            if (status === 200) {
               api.defaults.headers['authorization'] = `Bearer ${newToken}`
               setIsAuthenticated(true)
               setToken(newToken, true)
            } else {
               setToken(null, true)
               api.defaults.headers['authorization'] = undefined
            }
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