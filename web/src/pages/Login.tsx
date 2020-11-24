import React, { useCallback, useState, FormEvent, useContext } from 'react'
import AccessPage from '../components/AccessPage'
import Button from '../components/Button'
import Form from '../components/Form'
import Input from '../components/Input'
import AuthContext from '../context/auth/AuthContext'

const Login: React.FC = () => {
   const { handleLogin } = useContext(AuthContext)

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      handleLogin(email, password, false)
   }, [email, password, handleLogin])

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
               <Button type='submit'>Entrar</Button>
            </Form>
         </AccessPage>
      </div>
   )
}

export default Login