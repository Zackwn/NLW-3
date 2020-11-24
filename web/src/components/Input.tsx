import React from 'react';

import '../styles/components/input.css'

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
   labelText: string
}

const Input: React.FC<InputProps> = ({ children, labelText, ...inputProps }) => {
   return (
      <div className='input-component'>
         <label>{labelText}</label>
         <input {...inputProps} />
      </div>
   )
}

export default Input