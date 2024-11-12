import { useState, useEffect } from 'react'
import { fetchCategories } from '@/utils/api'
import { Category } from '.'

export const useCategories = () => {
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
  }, [])

  return { categories }
}
