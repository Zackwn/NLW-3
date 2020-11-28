import { createContext } from 'react'

export type ToastType = 'warn' | 'error' | 'success'

export interface IToastConfig {
   type: ToastType,
   message: string,
   id: string
}

interface ToastContext {
   toast(toast: Omit<IToastConfig, 'id'>): void
}

export default createContext<ToastContext>({} as ToastContext)