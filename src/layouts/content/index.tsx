'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useProducts } from './useProducts'
import { useCategories } from './useCategories'
import FilterForm from './Filter'
import CategoryList from './CategoryList'
import ProductList from './ProductList'
//override antd styles
import './index.css'

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

const MarketplaceGrid = () => {
  const ITEMS_PER_PAGE = 20
  const REFRESH_INTERVAL = 60000
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { products, setQueryParams, setPage, handleLoadMore } = useProducts(
    {},
    ITEMS_PER_PAGE,
    REFRESH_INTERVAL,
  )
  const { categories } = useCategories()

  const handleSearch = (values: any) => {
    const { search, priceRange, rarity, sort } = values
    const newQueryParams = {
      title_like: search,
      price_gte: priceRange ? priceRange[0] : undefined,
      price_lte: priceRange ? priceRange[1] : undefined,
      _sort: sort,
      category: rarity !== 'all' ? rarity : undefined,
    }
    setQueryParams(newQueryParams)
    setPage(1)
  }

  const handleCategoryClick = (categoryName?: string) => {
    setActiveCategory(categoryName)
    setQueryParams((prev) => ({ ...prev, category: categoryName }))
    setPage(1)
  }

  const handleResetFilters = () => {
    setQueryParams({})
    setPage(1)
  }

  return (
    <div className='size-full bg-[url("/images/content/content-bg.png")] bg-cover bg-center bg-no-repeat'>
      <div className='mx-auto flex max-w-[1700px] justify-center gap-6 px-10 py-20'>
        <div className='w-[380px]'>
          <FilterForm onSearch={handleSearch} onReset={handleResetFilters} />
        </div>

        <div>
          <CategoryList
            categories={categories}
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
          />
          <ProductList
            products={products}
            onLoadMore={handleLoadMore}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </div>
      </div>
      <Image
        src='/images/content/footer.png'
        alt='footer'
        width={1920}
        height={200}
        className='w-full object-cover'
      />
    </div>
  )
}

export default MarketplaceGrid
