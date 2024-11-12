import { useState, useEffect } from 'react'
import { fetchProducts, ProductQueryParams } from '@/utils/api'
import { Product } from '@/interfaces/common'
import { ITEMS_PER_PAGE, REFRESH_INTERVAL } from '@/constants/common'

export const useProducts = (
  initialQueryParams: ProductQueryParams = {},
  itemsPerPage: number = ITEMS_PER_PAGE,
  refreshInterval: number = REFRESH_INTERVAL,
) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [queryParams, setQueryParams] =
    useState<ProductQueryParams>(initialQueryParams)

  const loadProducts = async (params: ProductQueryParams = {}) => {
    try {
      const data = await fetchProducts({
        ...params,
        _page: page,
        _limit: itemsPerPage,
      })
      setProducts(data)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts(queryParams)

    const intervalId = setInterval(() => {
      loadProducts(queryParams)
    }, refreshInterval)

    return () => clearInterval(intervalId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, queryParams])

  const handleLoadMore = async () => {
    try {
      const data = await fetchProducts({
        ...queryParams,
        _page: page + 1,
        _limit: itemsPerPage,
      })
      setProducts((prevProducts) => [...prevProducts, ...data])
      setPage(page + 1)
    } catch (error) {
      throw error
    }
  }

  return { products, loading, setQueryParams, setPage, handleLoadMore }
}
