import { renderHook } from '@testing-library/react'
import { useProducts } from '../useProducts'
import { fetchProducts } from '@/utils/api'
import { act, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock the api module
jest.mock('@/utils/api', () => ({
  fetchProducts: jest.fn(),
}))

// Configure matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('useProducts', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 100,
      isFavorite: false,
      category: 'test',
      createdAt: '2024-03-20T00:00:00.000Z',
      theme: 'dark',
      tier: 'basic',
      imageId: 1,
      author: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        gender: 'male',
        avatar: 'avatar.jpg',
        onlineStatus: 'online',
      },
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should initialize with default values', async () => {
    ;(fetchProducts as jest.Mock).mockResolvedValueOnce(mockProducts)

    const { result } = renderHook(() => useProducts())

    expect(result.current.loading).toBe(true)
    expect(result.current.products).toEqual([])

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.products).toEqual(mockProducts)
  })

  it('should handle loadMore correctly', async () => {
    const page1Products = [...mockProducts]
    const page2Products = [{ ...mockProducts[0], id: 2 }]

    ;(fetchProducts as jest.Mock)
      .mockResolvedValueOnce(page1Products)
      .mockResolvedValueOnce(page2Products)

    const { result } = renderHook(() => useProducts())

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.products).toEqual(page1Products)

    // Trigger load more
    await act(async () => {
      result.current.handleLoadMore()
    })

    // Wait for loading to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Check final state
    expect(result.current.products).toEqual([
      ...page1Products,
      ...page2Products,
    ])
  })

  it('should handle search correctly', async () => {
    // Reset mock before test
    ;(fetchProducts as jest.Mock).mockReset()

    const initialProducts = [
      {
        id: 1,
        title: 'Test Product 1',
        price: 100,
        isFavorite: false,
        category: 'test',
        createdAt: '2024-03-20T00:00:00.000Z',
        theme: 'dark',
        tier: 'basic',
        imageId: 1,
        author: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          gender: 'male',
          avatar: 'avatar.jpg',
          onlineStatus: 'online',
        },
      },
    ]

    const searchResults = [
      {
        ...initialProducts[0],
        title: 'Searched Product',
      },
    ]

    // Set up sequential mock responses
    ;(fetchProducts as jest.Mock)
      .mockResolvedValueOnce(initialProducts) // First call (initial load)
      .mockResolvedValueOnce(searchResults) // Second call (search)

    const { result } = renderHook(() => useProducts())

    // Wait for initial load to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.products).toEqual(initialProducts)

    // Perform search
    await act(async () => {
      await result.current.handleSearch('search')
    })

    // Wait for search to complete and verify results
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.products).toEqual(searchResults)
    })

    // Verify the search API call
    expect(fetchProducts).toHaveBeenCalledWith(
      expect.objectContaining({
        _page: 1,
        _limit: 20,
        title_like: 'search',
      }),
    )
  })

  it('should handle errors gracefully', async () => {
    // Mock the API call to reject immediately
    ;(fetchProducts as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

    const { result } = renderHook(() => useProducts())

    // Initial state check
    expect(result.current.loading).toBe(true)
    expect(result.current.products).toEqual([])

    // Wait for the effect to complete and error to be handled
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Verify final state
    expect(result.current.products).toEqual([])
  })

  it('should handle loadMore errors gracefully', async () => {
    // Initial successful load
    ;(fetchProducts as jest.Mock)
      .mockResolvedValueOnce([{ id: 1, title: 'Test' }])
      // Then fail on load more
      .mockRejectedValueOnce(new Error('Load More Error'))

    const { result } = renderHook(() => useProducts())

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Trigger load more
    await act(async () => {
      await result.current.handleLoadMore()
    })

    expect(result.current.products).toEqual([])
  })

  it('should handle search errors gracefully', async () => {
    // Initial successful load
    ;(fetchProducts as jest.Mock)
      .mockResolvedValueOnce([{ id: 1, title: 'Test' }])
      // Then fail on search
      .mockRejectedValueOnce(new Error('Search Error'))

    const { result } = renderHook(() => useProducts())

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Perform search
    await act(async () => {
      await result.current.handleSearch('test')
    })

    expect(result.current.products).toEqual([])
    expect(result.current.loading).toBe(false)
  })

  it('should cleanup interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(window, 'clearInterval')

    const { unmount } = renderHook(() => useProducts())

    jest.runOnlyPendingTimers()
    unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()
    clearIntervalSpy.mockRestore()
  })
})
