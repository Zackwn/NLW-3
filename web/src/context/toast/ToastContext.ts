import { createContext } from 'react'

export type ToastType = 'warn' | 'error' | 'success'

export interface IToast {
   type: ToastType,
   message: string,
   id: string
}

interface ToastContext {
   toast(toast: Omit<IToast, 'id'>): void
}

export default createContext<ToastContext>({} as ToastContext)