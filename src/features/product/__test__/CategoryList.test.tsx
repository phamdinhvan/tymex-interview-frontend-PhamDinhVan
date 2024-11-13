import { render, screen, fireEvent } from '@testing-library/react'
import CategoryList from '../CategoryList'
import '@testing-library/jest-dom'

describe('CategoryList', () => {
  const mockCategories = [
    { id: 1, name: 'Art' },
    { id: 2, name: 'Music' },
    { id: 3, name: 'Sports' },
  ]

  const mockOnCategoryClick = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all categories and "All" button', () => {
    render(
      <CategoryList
        categories={mockCategories}
        activeCategory={null}
        onCategoryClick={mockOnCategoryClick}
      />,
    )

    // Check "All" button exists
    expect(screen.getByText('All')).toBeInTheDocument()

    // Check all category buttons are rendered
    mockCategories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument()
    })
  })

  it('applies correct styling for active category', () => {
    const activeCategory = 'Art'
    render(
      <CategoryList
        categories={mockCategories}
        activeCategory={activeCategory}
        onCategoryClick={mockOnCategoryClick}
      />,
    )

    const activeButton = screen.getByText(activeCategory)
    const inactiveButton = screen.getByText('Music')

    // Check the buttons themselves for the gradient classes
    expect(activeButton).toHaveClass('bg-gradient-to-r')
    expect(activeButton).toHaveClass('from-[#DA458F]')
    expect(activeButton).toHaveClass('to-[#DA34DD]')

    expect(inactiveButton).toHaveClass('bg-gradient-to-r')
    expect(inactiveButton).toHaveClass('from-[rgba(218,69,143,0.4)]')
    expect(inactiveButton).toHaveClass('to-[rgba(218,52,221,0.4)]')
  })

  it('calls onCategoryClick with correct arguments', () => {
    render(
      <CategoryList
        categories={mockCategories}
        activeCategory={null}
        onCategoryClick={mockOnCategoryClick}
      />,
    )

    // Click "All" button
    fireEvent.click(screen.getByText('All'))
    expect(mockOnCategoryClick).toHaveBeenCalledWith(null)

    // Click a category button
    fireEvent.click(screen.getByText('Art'))
    expect(mockOnCategoryClick).toHaveBeenCalledWith('Art')
  })

  it('handles empty categories array', () => {
    render(
      <CategoryList
        categories={[]}
        activeCategory={null}
        onCategoryClick={mockOnCategoryClick}
      />,
    )

    // Should still render "All" button
    expect(screen.getByText('All')).toBeInTheDocument()
  })
})
