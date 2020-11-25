import React from 'react'
import AccessPage from '../components/AccessPage'
import Button from '../components/Button'
import Form from '../components/Form'
import Input from '../components/Input'

const ForgotPassword: React.FC = () => {
   return (
      <AccessPage>
         <Form
            formTitle='Esqueci a senha'
            formSubTitle='Sua redefinição de senha será enviada para o e-mail cadastrado.'
         >
            <Input labelText='E-mail' value='' />
            <Button>Entrar</Button>
         </Form>
      </AccessPage>
   )
}

export default ForgotPassword