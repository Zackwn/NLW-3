import React, { useEffect, useState } from 'react'

import AuthContext from './AuthContext'

import api from '../../services/api'
import useLocalStorage from '../../hooks/useLocalStorage'

const AuthProvider: React.FC = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [token, setToken] = useLocalStorage<string | null>('token', null)

   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      if (token) {
         setIsAuthenticated(true)
         api.defaults.headers['authorization'] = `Bearer ${token}`
      }
      setIsLoading(false)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   async function handleLogin(email: string, password: string) {
      const response = await api.post('/user/login', {
         email, password
      })
      // console.log(response)
      if (response.status === 200) {
         setToken(response.data)
         setIsAuthenticated(true)
         api.defaults.headers['authorization'] = `Bearer ${token}`
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