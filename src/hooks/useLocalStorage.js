import { useEffect, useState } from 'react'

export function useLocalStorage(key, fallback) {
  const [value, setValue] = useState(() => {
    try {
      let saved = window.localStorage.getItem(key)

      if (!saved && key === 'focusboard_tasks') {
        saved = window.localStorage.getItem('focusboard-tasks')
      }

      if (!saved) return fallback

      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.every((task) =>
        task && ['id', 'title', 'description', 'category', 'status', 'priority', 'dueDate'].every((field) =>
          Object.prototype.hasOwnProperty.call(task, field),
        ),
      )) {
        return parsed
      }

      return fallback
    } catch {
      return fallback
    }
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
