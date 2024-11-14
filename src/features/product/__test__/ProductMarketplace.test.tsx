import { render, screen, waitFor } from '@testing-library/react'
import ProductMarketplace from '../index'
import { useProducts } from '@/hooks/useProducts'

// Mock the modules
jest.mock('@/hooks/useProducts')

// Mock matchMedia
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

const mockProducts = [
  {
    id: 993,
    title: 'The Beatmaker',
    category: 'Hat',
    price: 153.01,
    isFavorite: true,
    createdAt: 1687565516000,
    theme: 'Colorful',
    tier: 'Premium',
    imageId: 6,
    author: {
      firstName: 'Cloe',
      lastName: 'Doe',
      email: 'cdoe4@hexun.com',
      gender: 'Female',
      avatar:
        'https://robohash.org/teneturdoloremquenon.png?size=100x100&set=set1',
      onlineStatus: 'offline',
    },
  },
]

describe('ProductMarketplace', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useProducts as jest.Mock).mockReturnValue({
      products: mockProducts,
      loading: false,
      setQueryParams: jest.fn(),
      setPage: jest.fn(),
      handleLoadMore: jest.fn(),
      handleSearch: jest.fn(),
    })
  })

  it('loads and displays products', async () => {
    render(<ProductMarketplace />)
    await waitFor(() => {
      expect(screen.getByText('The Beatmaker')).toBeInTheDocument()
    })
  })
})
