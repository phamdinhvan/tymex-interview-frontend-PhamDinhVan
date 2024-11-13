import { useState, useEffect } from 'react'
import { fetchCategories } from '@/utils/api'
import { Category } from '@/interfaces/common'
import { REFRESH_INTERVAL } from '@/constants/common'

export const useCategories = (refreshInterval: number = REFRESH_INTERVAL) => {
  const [categories, setCategories] = useState<Category[]>([])

  const loadCategories = async () => {
    try {
      const data = await fetchCategories()
      setCategories(data)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    loadCategories()

    const intervalId = setInterval(() => {
      loadCategories()
    }, refreshInterval)

    return () => clearInterval(intervalId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { categories }
}
