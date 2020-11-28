import React, { useEffect, useRef, useState } from 'react'
import ToastContext from './ToastContext'

import { IToastConfig } from './ToastContext'

import '../../styles/toast.css'

const ToastProvider: React.FC = ({ children }) => {
   const toastsContainer = useRef<HTMLDivElement>(null)
   const [timeoutIDs, setTimeoutIDs] = useState<NodeJS.Timeout[]>([])

   function toast(toastConfig: IToastConfig) {
      let toast = document.createElement('div')
      toast.innerHTML = toastConfig.message

      toast.classList.add('toast')
      toast.classList.add('animate-toast-in')

      toast.classList.add(toastConfig.type)

      toastsContainer.current?.appendChild(toast)

      const timeoutID = setTimeout(() => {
         toast.classList.remove('animate-toast-in')
         toast.classList.add('animate-toast-out')
         toast.addEventListener('animationend', (event) => {
            if (event.animationName === 'slide-out') {
               toastsContainer.current?.removeChild(toast)
            }
         })
      }, 3000)

      setTimeoutIDs(currentState => [...currentState, timeoutID])
   }

   useEffect(() => {
      if (timeoutIDs.length) {
         const timeoutID = timeoutIDs.shift()
         if (timeoutID) {
            clearTimeout(timeoutID)
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <ToastContext.Provider
         value={{
            toast
         }}
      >
         {children}
         <div ref={toastsContainer} id='toast-container' />
      </ToastContext.Provider>
   )
}

export default ToastProvider