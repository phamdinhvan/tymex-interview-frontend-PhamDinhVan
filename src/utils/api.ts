const API_BASE_URL = 'http://localhost:5005'

export interface ProductQueryParams {
  _page?: number
  _limit?: number
  _sort?: string // Sort by field
  _order?: 'asc' | 'desc' // Sort order
  price_gte?: number // Minimum price filter
  price_lte?: number // Maximum price filter
  title_like?: string // Search for titles containing a string
  category?: string // Filter by category
  theme?: string // Filter by theme
  isFavorite?: boolean // Filter by favorite status
  tier?: string // Filter by tie
}

export async function fetchProducts(options: ProductQueryParams = {}) {
  try {
    // filter undefined or null values
    const filteredOptions = Object.fromEntries(
      Object.entries(options).filter(([, value]) => value != null),
    )

    const queryString = new URLSearchParams(filteredOptions).toString()
    const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ''}`

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    throw error
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return response.json()
  } catch (error) {
    throw error
  }
}

export async function fetchProductById(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    throw error
  }
}
