import { fetchProducts, ProductQueryParams } from '../api'

// Mock fetch globally
global.fetch = jest.fn()

describe('fetchProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should fetch products with no parameters', async () => {
    const mockProducts = [{ id: 1, name: 'Test Product' }]
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    })

    const result = await fetchProducts()

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
      expect.objectContaining({
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    )
    expect(result).toEqual(mockProducts)
  })

  it('should fetch products with query parameters', async () => {
    const mockProducts = [{ id: 1, name: 'Test Product' }]
    const queryParams: ProductQueryParams = {
      _page: 1,
      _limit: 10,
      category: 'Hat',
      price_gte: 100,
    }

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    })

    const result = await fetchProducts(queryParams)

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?_page=1&_limit=10&category=Hat&price_gte=100`,
      expect.objectContaining({
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    )
    expect(result).toEqual(mockProducts)
  })

  it('should filter out null and undefined values from query parameters', async () => {
    const mockProducts = [{ id: 1, name: 'Test Product' }]
    const queryParams: ProductQueryParams = {
      _page: 1,
      _limit: null,
      category: undefined,
      price_gte: 100,
    }

    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    })

    const result = await fetchProducts(queryParams)

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?_page=1&price_gte=100`,
      expect.objectContaining({
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    )
    expect(result).toEqual(mockProducts)
  })

  it('should throw an error when response is not ok', async () => {
    const errorStatus = 404
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: errorStatus,
    })

    await expect(fetchProducts()).rejects.toThrow(
      `HTTP error! status: ${errorStatus}`,
    )
  })

  it('should throw an error when fetch fails', async () => {
    const networkError = new Error('Network error')
    ;(fetch as jest.Mock).mockRejectedValueOnce(networkError)

    await expect(fetchProducts()).rejects.toThrow(networkError)
  })
})
