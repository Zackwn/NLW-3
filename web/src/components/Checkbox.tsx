import React from 'react'

import '../styles/components/checkbox.css'

interface CheckboxProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
   labelText: string,
   id: string
}

const Checkbox: React.FC<CheckboxProps> = ({ children: _, labelText, id, ...inputProps }) => {
   return (
      <div className='checkbox-wrapper'>
         <input
            type='checkbox'
            className='checkbox-component'
            {...inputProps}
            id={id}
         />
         <label htmlFor={id}>{labelText}</label>
      </div>
   )
}

export default Checkbox