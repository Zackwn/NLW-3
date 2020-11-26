import React, { FormEvent, useState } from 'react'
import AccessPage from '../components/AccessPage'
import Button from '../components/Button'
import Form from '../components/Form'
import Input from '../components/Input'
import api from '../services/api'

const ForgotPassword: React.FC = () => {
   const [email, setEmail] = useState('')

   async function handleForgotPassword(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()

      if (!email) {
         return
      }

      await api.post('/user/forgot-password', {
         email
      })
   }

   return (
      <AccessPage>
         <Form
            formTitle='Esqueci a senha'
            formSubTitle='Sua redefinição de senha será enviada para o e-mail cadastrado.'
            onSubmit={handleForgotPassword}
         >
            <Input
               labelText='E-mail'
               value={email}
               onChange={({ target }) => setEmail(target.value)}
            />
            <Button>Entrar</Button>
         </Form>
      </AccessPage>
   )
}

export default ForgotPassword