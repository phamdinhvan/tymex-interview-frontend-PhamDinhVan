'use client'

import { ITEMS_PER_PAGE } from '@/constants/common'
import { useProducts } from '@/hooks/useProducts'
import { ProductQueryParams } from '@/utils/api'
import {
  CloseOutlined,
  FilterOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { Button, Drawer, Input } from 'antd'
import Image from 'next/image'
import { useEffect, useState } from 'react'

//override antd styles
import { CATEGORIES } from '@/constants/category'
import { useDebounce } from '@/hooks/useDebounce'
import './index.css'

import dynamic from 'next/dynamic'

//lazy loading
const CategoryList = dynamic(() => import('./CategoryList'))
const FilterForm = dynamic(() => import('./FilterForm'))
const ProductList = dynamic(() => import('./ProductList'))

const ProductMarketplace = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const {
    products,
    loading,
    setQueryParams,
    setPage,
    handleLoadMore,
    handleSearch,
  } = useProducts({})

  //handle search with debounce
  useEffect(() => {
    handleSearch(debouncedSearchTerm)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm])

  const onSearchProduct = (values: any) => {
    const { priceRange, price, time, theme, tier } = values
    const sortFields = []
    const sortOrders = []

    //sort by price
    if (price && price !== 'All') {
      sortFields.push('price')
      //sort by ascending or descending
      sortOrders.push(price)
    }

    //sort by time
    if (time && time !== 'All') {
      sortFields.push('createdAt')
      //sort by latest or oldest
      sortOrders.push(time === 'latest' ? 'desc' : 'asc')
    }

    const newQueryParams = {
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
    //reset page to 1
    setPage(1)
  }

  const onResetFilters = () => {
    setQueryParams({})
    setActiveCategory(null)
    setPage(1)
  }

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible)
  }

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <main className='size-full bg-[url("/images/content/content-bg.png")] bg-cover bg-center bg-no-repeat'>
      <div className='mx-auto flex max-w-[1700px] justify-center gap-6 p-10 lg:py-20'>
        <div className='hidden w-[380px] lg:block'>
          <Input
            prefix={<SearchOutlined className='!text-[#89888B]' />}
            placeholder='Quick search'
            className='mb-8 w-full bg-transparent'
            size='large'
            allowClear
            onChange={onSearch}
          />
          <FilterForm onSearch={onSearchProduct} onReset={onResetFilters} />
        </div>

        <div>
          <div className='px-2 lg:hidden'>
            <div className='flex items-start justify-between gap-4'>
              <Button
                icon={<FilterOutlined />}
                onClick={toggleDrawer}
                className='mb-4'
                size='large'
              >
                Filter
              </Button>
              <Input
                prefix={<SearchOutlined className='!text-[#89888B]' />}
                placeholder='Quick search'
                className='w-full bg-transparent'
                size='large'
                allowClear
                onChange={onSearch}
              />
            </div>
            <Drawer
              title='Filter'
              placement='bottom'
              onClose={toggleDrawer}
              className='!rounded-t-xl !bg-black/90 !text-[#89888b]'
              open={isDrawerVisible}
              height='fit-content'
              closeIcon={<CloseOutlined className='!text-[#89888b]' />}
            >
              <FilterForm
                onSearch={onSearchProduct}
                onReset={() => {
                  onResetFilters()
                  toggleDrawer()
                }}
              />
            </Drawer>
          </div>
          <CategoryList
            categories={CATEGORIES}
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
