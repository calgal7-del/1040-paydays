import { useEffect, useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key)

      if (saved === null) {
        return initialValue
      }

      return JSON.parse(saved)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // If storage fails, the app still works for the current session.
    }
  }, [key, value])

  return [value, setValue]
}
