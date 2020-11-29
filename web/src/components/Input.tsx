import React from 'react';

import '../styles/components/input.css'

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
   labelText: string,
   error?: string
}

const Input: React.FC<InputProps> = ({ children, labelText, error, ...inputProps }) => {
   return (
      <div className='input-component'>
         <label
            className={error ? 'with-error' : ''}
         >{labelText}</label>
         <input
            className={error ? 'with-error' : ''}
            {...inputProps}
         />
         {error ? <span>{error}</span> : null}
      </div>
   )
}

export default Input