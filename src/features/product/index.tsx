'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useProducts } from '@/hooks/useProducts'
import { useCategories } from '@/hooks/useCategories'
import FilterForm from './FilterForm'
import CategoryList from './CategoryList'
import ProductList from './ProductList'

//override antd styles
import './index.css'

const ProductMarketplace = () => {
  const ITEMS_PER_PAGE = 20
  const REFRESH_INTERVAL = 60000
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { products, setQueryParams, setPage, handleLoadMore } = useProducts(
    {},
    ITEMS_PER_PAGE,
    REFRESH_INTERVAL,
  )
  const { categories } = useCategories()

  const onSearchProduct = (values: any) => {
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

  const onCateClick = (categoryName?: string) => {
    setActiveCategory(categoryName)
    setQueryParams((prev) => ({ ...prev, category: categoryName }))
    setPage(1)
  }

  const onResetFilters = () => {
    setQueryParams({})
    setPage(1)
  }

  return (
    <main className='size-full bg-[url("/images/content/content-bg.png")] bg-cover bg-center bg-no-repeat'>
      <div className='mx-auto flex max-w-[1700px] justify-center gap-6 px-10 py-20'>
        <div className='w-[380px]'>
          <FilterForm onSearch={onSearchProduct} onReset={onResetFilters} />
        </div>

        <div>
          <CategoryList
            categories={categories}
            activeCategory={activeCategory}
            onCategoryClick={onCateClick}
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
    </main>
  )
}

export default ProductMarketplace
