import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
   key: string,
   defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
   const [value, setValue] = useState<T>(() => {
      let value: T
      try {
         value = JSON.parse(window.localStorage.getItem(key) || JSON.stringify(defaultValue))
      } catch (error) {
         value = defaultValue
      }
      return value
   })

   useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value))
   }, [key, value])

   return [value, setValue]
}