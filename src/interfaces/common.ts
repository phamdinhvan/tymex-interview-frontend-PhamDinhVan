export interface Product {
  id: number
  title: string
  category: string
  price: number
  isFavorite: boolean
  createdAt: number
  theme: string
  tier: string
  imageId: number
  author: {
    firstName: string
    lastName: string
    email: string
    gender: string
    avatar: string
    onlineStatus: string
  }
}

export interface Category {
  id: number
  name: string
}
