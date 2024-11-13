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
      setLoading(true)
      const data = await fetchProducts({
        ...params,
        _page: page,
        _limit: itemsPerPage,
      })

      if (page === 1) {
        setProducts(data)
      }
    } catch (error) {
      setProducts([])
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
      setLoading(true)
      const data = await fetchProducts({
        ...queryParams,
        _page: page + 1,
        _limit: itemsPerPage,
      })
      setProducts((prevProducts) => [...prevProducts, ...data])
      setPage(page + 1)
    } catch (error) {
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (
    searchValue: string = '',
    searchPage: number = 1,
    searchLimit: number = itemsPerPage,
  ) => {
    setLoading(true)
    try {
      const data = await fetchProducts({
        ...queryParams,
        _page: searchPage,
        _limit: searchLimit,
        title_like: searchValue,
      })
      setProducts(data)
      setPage(searchPage)
    } catch (error) {
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  return {
    products,
    loading,
    setQueryParams,
    setPage,
    handleLoadMore,
    handleSearch,
  }
}
