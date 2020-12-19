import { useCallback, useState } from "react";

export default function useLocalStorage<T>(
   key: string,
   defaultValue: T
): [T, (newValue: T, storeInLocalStorage: boolean) => void] {
   const [value, setValueState] = useState<T>(() => {
      let value: T
      try {
         value = JSON.parse(window.localStorage.getItem(key) || JSON.stringify(defaultValue))
      } catch (error) {
         value = defaultValue
      }
      return value
   })

   // useEffect(() => {
   //    window.localStorage.setItem(key, JSON.stringify(value))
   // }, [key, value])

   const setValue = useCallback((newValue: T, isToStoreInLocalStorage: boolean) => {
      setValueState(value)
      if (isToStoreInLocalStorage) {
         if (newValue === null || newValue === undefined) {
            window.localStorage.removeItem(key)
         } else {
            window.localStorage.setItem(key, JSON.stringify(newValue))
         }
      }
   }, [key, value])

   return [value, setValue]
}