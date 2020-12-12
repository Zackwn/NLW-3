import React from 'react'

import '../styles/components/text/textarea.css'

interface TextareaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
   labelText: string,
   labelSubText: string,
   id: string,
   error?: string | undefined
}

const Textarea: React.FC<TextareaProps> = ({
   children: _,
   labelText,
   labelSubText = '',
   id,
   error,
   ...textareaProps
}) => {
   return (
      <div className={`text-component textarea-component${error ? ' with-error' : ''}`}>
         <label
            htmlFor={id}
         >{labelText}<span>{labelSubText}</span></label>
         <textarea
            id={id}
            // blank placeholder to css :placeholder-shown work
            placeholder=' '
            {...textareaProps}
         />
         {error ? <span className='text-error'>{error}</span> : null}
      </div>
   )
}

export default Textarea