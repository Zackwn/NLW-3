import React from 'react'

import '../styles/components/form.css'

interface FormProps extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
   formTitle: string
}

const Form: React.FC<FormProps> = ({ children, formTitle, ...formProps }) => {
   return (
      <form id='form-component' {...formProps}>
         <h1 id='form-title'>{formTitle}</h1>
         {children}
      </form>
   )
}

export default Form