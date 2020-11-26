import React from 'react'

import '../styles/components/form.css'

interface FormProps extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
   formTitle: string,
   formSubTitle?: string
}

const Form: React.FC<FormProps> = ({ children, formTitle, formSubTitle, ...formProps }) => {
   return (
      <form id='form-component' {...formProps}>
         <div id='form-component-titles-wrapper'>
            <h1
               className={formSubTitle ? '' : 'margin-bottom'}
               id='form-title'
            >{formTitle}</h1>
            {formSubTitle
               ? (
                  <h2
                     id='form-subtitle'
                     className='margin-bottom'
                  >{formSubTitle}</h2>
               ) : null
            }
         </div>
         {children}
      </form>
   )
}

export default Form