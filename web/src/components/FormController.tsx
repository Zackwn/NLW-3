import React, { useRef, useState } from 'react';

type FormControllerValues = {
   [key: string]: any
}

export type FormControllerErrors<Values extends {}> = {
   [key in keyof Values]?: string | undefined
}

interface FormControllerChildrenProps<Values> {
   data: Values,
   errors: FormControllerErrors<Values>
}

interface FormControllerProps<Values> {
   className?: string
   initialValues: Values
   initialErrors?: FormControllerErrors<Values>
   onSubmit: (data: Values, setErrors: React.Dispatch<React.SetStateAction<FormControllerErrors<Values>>>) => Promise<void>
   children: (formControllerChildrenProps: FormControllerChildrenProps<Values>) => JSX.Element
}

// React.FC<FormControllerProps>
const FormController = <Values extends FormControllerValues = FormControllerValues>({
   children,
   initialValues,
   initialErrors = {} as FormControllerErrors<Values>,
   onSubmit,
   className
}: FormControllerProps<Values>) => {
   const formData = useRef<Values>(initialValues)
   const [formErrors, setFormErrors] = useState<FormControllerErrors<Values>>(initialErrors)

   return (
      <form className={className ? className : ''} onSubmit={async (event) => {
         event.preventDefault()

         await onSubmit(formData.current, setFormErrors)
      }}>
         {children({
            data: formData.current,
            errors: formErrors
         })}
      </form>
   )
}

/*
function FormControllerUsage() {
   return (
      <FormController
         initialErrors={{ name: 'Initial Error' }}
         initialValues={{ name: '' }}
         onSubmit={async (data) => { console.log(data) }}
      >
         {({ data, errors }) => {
            return (
               <>
                  <input
                     defaultValue={data.name}
                     onChange={(e) => { data.name = e.target.value }}
                  />
                  {errors.name ? <span>{errors.name}</span> : null}
               </>
            )
         }}
      </FormController>
   )
}
*/

export default FormController