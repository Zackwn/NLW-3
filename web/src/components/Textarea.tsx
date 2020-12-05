import React from 'react'

import '../styles/components/textarea.css'

interface TextareaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
   labelText: string,
   labelSubText: string,
   id: string
}

const Textarea: React.FC<TextareaProps> = ({
   children: _,
   labelText,
   labelSubText = '',
   id,
   ...textareaProps
}) => {
   return (
      <div className='textarea-component'>
         <label htmlFor={id}>{labelText}<span>{labelSubText}</span></label>
         <textarea
            id={id}
            // blank placeholder to css :placeholder-shown work
            placeholder=' '
            {...textareaProps}
         />
      </div>
   )
}

export default Textarea