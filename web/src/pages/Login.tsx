import React, { useCallback, useState, FormEvent, useContext } from 'react'
import AccessPage from '../components/AccessPage'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import Form from '../components/Form'
import Input from '../components/Input'
import AuthContext from '../context/auth/AuthContext'
import { Link, useHistory } from 'react-router-dom'

import '../styles/pages/login.css'
import ToastContext from '../context/toast/ToastContext'

const Login: React.FC = () => {
   const history = useHistory()
   const { handleLogin } = useContext(AuthContext)
   const { toast } = useContext(ToastContext)

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [rememberUser, setRememberUser] = useState(false)

   const [emailError, setEmailError] = useState<string | undefined>()
   const [passwordError, setPasswordError] = useState<string | undefined>()

   const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      console.log({ rememberUser })
      try {
         await handleLogin(email, password, rememberUser)
         setEmailError(undefined)
         setPasswordError(undefined)
         toast({ message: 'Login feito com sucesso!', type: 'success' })
         history.push('/dashboard/orphanages/')
      } catch (error) {
         const { fieldErrors } = error.response.data
         if (fieldErrors) {
            if (fieldErrors.email) {
               setEmailError(fieldErrors.email)
            } else {
               setEmailError(undefined)
            }
            if (fieldErrors.password) {
               setPasswordError(fieldErrors.password)
            } else {
               setPasswordError(undefined)
            }
         } else {
            toast({ message: 'Algo deu errado, tente novamente', type: 'error' })
         }
      }
   }, [rememberUser, handleLogin, email, password, toast, history])

   return (
      <div>
         <AccessPage>
            <Form formTitle='Fazer Login' onSubmit={handleSubmit}>
               <Input
                  labelText='E-mail'
                  type="email"
                  onChange={({ target }) => setEmail(target.value)}
                  value={email}
                  error={emailError}
               />
               <Input
                  labelText='Senha'
                  type="password"
                  onChange={({ target }) => setPassword(target.value)}
                  value={password}
                  error={passwordError}
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