import React from 'react';

import '../styles/components/text/input.css'

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
   labelText: string,
   error?: string
}

const Input: React.FC<InputProps> = ({ children, labelText, error, ...inputProps }) => {
   return (
      <div className={`text-component input-component${error ? ' with-error' : ''}`}>
         <label
         >{labelText}</label>
         <input
            placeholder=' '
            {...inputProps}
         />
         {error ? <span className='text-error'>{error}</span> : null}
      </div>
   )
}

export default Input