import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductCard from '../ProductCard'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, whileTap, ...props }) => (
      <div data-testid='motion-div' {...props}>
        {children}
      </div>
    ),
  },
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />,
}))

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

describe('ProductCard', () => {
  const mockProps = {
    tier: 'Tier 1',
    title: 'Test Product',
    price: 0.5,
    isFavorite: false,
    author: {
      avatar: 'https://example.com/avatar.jpg',
      firstName: 'John',
      lastName: 'Doe',
    },
  }

  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('displays favorite icon based on isFavorite prop', () => {
    const { rerender } = render(<ProductCard {...mockProps} />)

    const notFavoriteIcon = screen.getByRole('img', { name: /not favorite/i })
    expect(notFavoriteIcon).toBeInTheDocument()

    rerender(<ProductCard {...mockProps} isFavorite={true} />)

    const favoriteIcon = screen.getByRole('img', { name: /favorite/i })
    expect(favoriteIcon).toBeInTheDocument()
  })

  it('renders product information correctly', () => {
    render(<ProductCard {...mockProps} />)

    expect(screen.getByText('Tier 1')).toBeInTheDocument()
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('0.5 ETH')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
