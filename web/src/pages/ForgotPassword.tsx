import React from 'react'
import AccessPage from '../components/AccessPage'
import Form from '../components/Form'

const ForgotPassword: React.FC = () => {
   return (
      <AccessPage>
         <Form
            formTitle='Esqueci a senha'
            formSubTitle='Sua redefinição de senha será enviada para o e-mail cadastrado.'
         >
         </Form>
      </AccessPage>
   )
}

export default ForgotPassword