import React from 'react'

import '../styles/components/button.css'

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}

const Button: React.FC<ButtonProps> = ({ children, ...buttonProps }) => {
   return (
      <button className='button-component' {...buttonProps}>
         {children}
      </button>
   )
}

export default Button