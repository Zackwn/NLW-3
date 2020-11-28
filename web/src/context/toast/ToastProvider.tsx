import React, { useEffect, useState } from 'react'
import ToastContext from './ToastContext'

import { IToast } from './ToastContext'

import '../../styles/toast.css'

const ToastProvider: React.FC = ({ children }) => {
   const [toasts, setToasts] = useState<IToast[]>([])
   const [timeoutIDs, setTimeoutIDs] = useState<NodeJS.Timeout[]>([])

   useEffect(() => {
      if (timeoutIDs.length > 0) {
         let timeoutID = timeoutIDs.shift()
         if (timeoutID) {
            console.log('clear...')
            clearTimeout(timeoutID)
         }
      }
      // if timeoutIDs is a dependency, after creating timeout it will be cleared
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   function toast(toast: IToast) {
      setToasts([...toasts, toast])

      let timeoutID = setTimeout(() => {
         setToasts(toasts => {
            return toasts.filter((_, index) => {
               return index !== 0
            })
         })
      }, 3000)

      setTimeoutIDs([...timeoutIDs, timeoutID])
   }

   return (
      <ToastContext.Provider
         value={{
            toast
         }}
      >
         {children}
         <div id='toast-container'>
            {toasts.map((toast, index) => {
               return (
                  <div key={Math.random() + Math.random()} className={`toast ${toast.type}`}>
                     {toast.message}
                  </div>
               )
            })}
         </div>
      </ToastContext.Provider>
   )
}

export default ToastProvider