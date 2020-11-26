import React, { FormEvent, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import AccessPage from '../components/AccessPage'
import Button from '../components/Button'
import Form from '../components/Form'
import Input from '../components/Input'
import api from '../services/api'

interface ChangePasswordParams {
   token: string
}

const ChangePassword: React.FC = () => {
   const history = useHistory()
   const { token } = useParams<ChangePasswordParams>()
   const [newPassword, setNewPassword] = useState('')
   // const [confirmNewPassword, setConfirm]

   async function handleChangePassword(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()

      const response = await api.post('/user/change-password', {
         token,
         newPassword
      })

      if (response.status === 200) {
         history.push('/')
      }
   }

   return (
      <AccessPage>
         <Form
            formTitle='Recuperação de Senha'
            formSubTitle={`Escolha uma nova senha para você acessar a dashboard do Happy`}
            onSubmit={handleChangePassword}
         >
            <Input
               labelText='Nova senha'
               value={newPassword}
               onChange={({ target }) => setNewPassword(target.value)}
            />
            <Button type='submit'>
               Entrar
            </Button>
         </Form>
      </AccessPage>
   )
}

export default ChangePassword