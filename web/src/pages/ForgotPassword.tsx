import React, { FormEvent, useContext, useState } from 'react'
import AccessPage from '../components/AccessPage'
import Button from '../components/Button'
import Form from '../components/Form'
import Input from '../components/Input'
import ToastContext from '../context/toast/ToastContext'
import api from '../services/api'

const ForgotPassword: React.FC = () => {
   const [email, setEmail] = useState('')

   const { toast } = useContext(ToastContext)

   async function handleForgotPassword(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()

      if (!email) {
         toast({ message: 'Preencha o email corretamente!', type: 'warn' })
         return
      }

      try {
         await api.post('/user/forgot-password', {
            email
         })
         toast({ message: 'Email enviado!', type: 'success' })
      } catch (error) {
         if (error.response.data.errors) {
            toast({
               message: Object.values(error.response.data.errors)[0] as string,
               type: 'error'
            })
         } else {
            toast({ message: 'Algo deu errado, tente novamente!', type: 'error' })
         }
      }
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