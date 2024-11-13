import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductList from '../ProductList'

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
    id: 1,
    title: 'Test NFT 1',
    category: 'Art',
    price: 1.5,
    isFavorite: false,
    createdAt: Date.now(),
    theme: 'Dark',
    tier: 'Epic',
    imageId: 1,
    author: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      gender: 'male',
      avatar: '/avatar1.png',
      onlineStatus: 'online',
    },
  },
  // Add more mock products...
]

describe('ProductList', () => {
  it('renders loading state correctly', () => {
    render(
      <ProductList
        products={[]}
        loading={true}
        onLoadMore={() => {}}
        itemsPerPage={20}
      />,
    )
    expect(screen.getByTestId('product-list-loading')).toBeInTheDocument()
  })

  it('renders empty state when no products', () => {
    render(
      <ProductList
        products={[]}
        loading={false}
        onLoadMore={() => {}}
        itemsPerPage={20}
      />,
    )
    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
  })

  it('renders product cards correctly', () => {
    render(
      <ProductList
        products={mockProducts}
        loading={false}
        onLoadMore={() => {}}
        itemsPerPage={20}
      />,
    )

    expect(screen.getByText('Test NFT 1')).toBeInTheDocument()
    expect(screen.getByText('1.5 ETH')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('shows load more button when more items available', () => {
    render(
      <ProductList
        products={mockProducts}
        loading={false}
        onLoadMore={() => {}}
        itemsPerPage={1}
      />,
    )
    expect(screen.getByText('View More')).toBeInTheDocument()
  })

  it('handles load more click', async () => {
    const user = userEvent.setup()
    const onLoadMore = jest.fn()

    render(
      <ProductList
        products={mockProducts}
        loading={false}
        onLoadMore={onLoadMore}
        itemsPerPage={1}
      />,
    )

    await user.click(screen.getByText('View More'))
    expect(onLoadMore).toHaveBeenCalled()
  })
})
