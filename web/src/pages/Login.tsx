import React, { useCallback, useState, FormEvent, useContext } from 'react'
import AccessPage from '../components/AccessPage'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import Form from '../components/Form'
import Input from '../components/Input'
import AuthContext from '../context/auth/AuthContext'
import { Link } from 'react-router-dom'

import '../styles/pages/login.css'
import ToastContext from '../context/toast/ToastContext'

const Login: React.FC = () => {
   const { handleLogin } = useContext(AuthContext)
   const { toast } = useContext(ToastContext)

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [rememberUser, setRememberUser] = useState(false)

   const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      console.log({ rememberUser })
      try {
         await handleLogin(email, password, rememberUser)
         toast({ message: 'Login feito com sucesso!', type: 'success' })
      } catch (error) {
         if (error.response.data.errors) {
            toast({
               message: Object.values(error.response.data.errors)[0] as string,
               type: 'error'
            })
         } else {
            toast({ message: 'Algo deu errado, tente novamente', type: 'error' })
         }
      }
   }, [rememberUser, handleLogin, email, password, toast])

   return (
      <div>
         <AccessPage>
            <Form formTitle='Fazer Login' onSubmit={handleSubmit}>
               <Input
                  labelText='E-mail'
                  type="email"
                  onChange={({ target }) => setEmail(target.value)}
                  value={email}
               />
               <Input
                  labelText='Senha'
                  type="password"
                  onChange={({ target }) => setPassword(target.value)}
                  value={password}
               />
               <div className='form-space-between-wrapper'>
                  <Checkbox
                     id='remember-me'
                     labelText='Lembrar-me'
                     onChange={({ target }) => setRememberUser(target.checked)}
                  />
                  <Link to='forgot-password' className='form-link'>Esqueci minha senha</Link>
               </div>
               <Button type='submit'>Entrar</Button>
            </Form>
         </AccessPage>
      </div>
   )
}

export default Login