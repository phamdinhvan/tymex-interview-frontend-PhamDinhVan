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
import { ITEMS_PER_PAGE } from '@/constants/common'
import { ProductQueryParams } from '@/utils/api'

const ProductMarketplace = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { products, loading, setQueryParams, setPage, handleLoadMore } =
    useProducts({})
  const { categories } = useCategories()

  const onSearchProduct = (values: any) => {
    const { search, priceRange, price, time, theme, tier } = values
    const sortFields = []
    const sortOrders = []

    if (price && price !== 'All') {
      sortFields.push('price')
      sortOrders.push(price)
    }

    if (time && time !== 'All') {
      sortFields.push('createdAt')
      sortOrders.push(time === 'latest' ? 'desc' : 'asc')
    }

    const newQueryParams = {
      title_like: search,
      price_gte: priceRange ? priceRange[0] : undefined,
      price_lte: priceRange ? priceRange[1] : undefined,
      _sort: sortFields.length ? sortFields.join(',') : undefined,
      _order: sortOrders.length ? sortOrders.join(',') : undefined,
      category: activeCategory,
      theme: theme !== 'All' ? theme : undefined,
      tier: tier !== 'All' ? tier : undefined,
    }

    setQueryParams(newQueryParams as ProductQueryParams)
    setPage(1)
  }
  const onCateClick = (categoryName?: string) => {
    setActiveCategory(categoryName)
    setQueryParams((prev) => ({ ...prev, category: categoryName }))
    setPage(1)
  }

  const onResetFilters = () => {
    setQueryParams({})
    setActiveCategory(null)
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
            loading={loading}
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
