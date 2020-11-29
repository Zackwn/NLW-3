import React, { FormEvent, useContext, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import AccessPage from '../components/AccessPage'
import Button from '../components/Button'
import Form from '../components/Form'
import Input from '../components/Input'
import api from '../services/api'

import eye from '../assets/eye.svg'
import eyeOff from '../assets/eye-off.svg'

import '../styles/pages/change-password.css'
import ToastContext from '../context/toast/ToastContext'

interface ChangePasswordParams {
   token: string
}

const ChangePassword: React.FC = () => {
   const history = useHistory()
   const { toast } = useContext(ToastContext)

   const { token } = useParams<ChangePasswordParams>()
   const [newPassword, setNewPassword] = useState('')
   const [newPasswordConfirm, setNewPasswordConfirm] = useState('')

   const [showNewPassword, setShowNewPassword] = useState(false)
   const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false)

   async function handleChangePassword(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()

      if (newPassword !== newPasswordConfirm) {
         return
      }

      try {
         const response = await api.post('/user/change-password', {
            token,
            newPassword,
            confirmPassword: newPasswordConfirm
         })

         toast({ message: 'Senha trocada com sucesso!', type: 'success' })

         if (response.status === 200) {
            history.push('/')
         }
      } catch (error) {
         console.log('aaaaaaaaaaa')
         console.log({ ...error })
         toast({ message: 'Algo deu errado, tente novamente!', type: 'error' })
      }
   }

   return (
      <AccessPage>
         <Form
            formTitle='Recuperação de Senha'
            formSubTitle={`Escolha uma nova senha para você acessar a dashboard do Happy`}
            onSubmit={handleChangePassword}
         >
            <div className='input-password-wrapper'>
               <Input
                  labelText='Nova senha'
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={({ target }) => setNewPassword(target.value)}
               />
               <img
                  src={showNewPassword ? eye : eyeOff}
                  alt='Eye'
                  className='password-icon'
                  onClick={() => {
                     setShowNewPassword(currentState => !currentState)
                  }}
               />
            </div>
            <div className='input-password-wrapper'>
               <Input
                  labelText='Repetir senha'
                  type={showNewPasswordConfirm ? 'text' : 'password'}
                  value={newPasswordConfirm}
                  onChange={({ target }) => setNewPasswordConfirm(target.value)}
               />
               <img
                  src={showNewPasswordConfirm ? eye : eyeOff}
                  alt='Eye'
                  className='password-icon'
                  onClick={() => {
                     setShowNewPasswordConfirm(currentState => !currentState)
                  }}
               />
            </div>
            <Button type='submit'>
               Entrar
            </Button>
         </Form>
      </AccessPage>
   )
}

export default ChangePassword