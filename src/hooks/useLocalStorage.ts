import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialvalue: T | (() => T)){
    const [value, setvalue] = useState<T>(() => {
         const jsonValue = localStorage.getItem(key)
         if (jsonValue != null) return JSON.parse(jsonValue)

         if (typeof initialvalue === "function"){
            return (initialvalue as () => T)()
         } else {
            return initialvalue
         }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setvalue] as [typeof value, typeof setvalue]
}