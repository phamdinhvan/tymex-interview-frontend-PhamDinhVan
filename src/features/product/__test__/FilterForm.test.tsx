import { act, fireEvent, render, screen } from '@testing-library/react'
import FilterForm from '../FilterForm'

// Mock antd components
jest.mock('antd', () => {
  const actual = jest.requireActual('antd')
  return {
    ...actual,
    Slider: ({ onChange }: any) => (
      <div data-testid='mock-slider' onClick={() => onChange([60, 170])}>
        Slider
      </div>
    ),
    Select: ({ onChange, options }: any) => (
      <select
        data-testid='mock-select'
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    ),
  }
})

// Mock ShinyButton component
jest.mock('@/components/ShinyButton', () => {
  return function MockShinyButton({ title, ...props }: any) {
    return <button {...props}>{title}</button>
  }
})

describe('FilterForm', () => {
  const mockOnSearch = jest.fn()
  const mockOnReset = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all form elements correctly', () => {
    render(<FilterForm onSearch={mockOnSearch} onReset={mockOnReset} />)

    // Check for form labels using more specific queries
    const priceLabels = screen.getAllByText('PRICE')
    expect(priceLabels).toHaveLength(2) // One for range, one for sorting
    expect(screen.getByText('TIER')).toBeInTheDocument()
    expect(screen.getByText('THEME')).toBeInTheDocument()
    expect(screen.getByText('TIME')).toBeInTheDocument()

    // Check for slider and price range values
    expect(screen.getByTestId('mock-slider')).toBeInTheDocument()
    expect(screen.getByText('0.01 ETH')).toBeInTheDocument()
    expect(screen.getByText('200 ETH')).toBeInTheDocument()

    // Check for select fields and their options
    const selects = screen.getAllByTestId('mock-select')
    expect(selects).toHaveLength(4)

    // Verify some specific options are present
    expect(screen.getByText('Premium')).toBeInTheDocument()
    expect(screen.getByText('Dark')).toBeInTheDocument()
    expect(screen.getByText('Latest')).toBeInTheDocument()
    expect(screen.getByText('Low to High')).toBeInTheDocument()

    // Check for buttons
    expect(
      screen.getByRole('button', { name: 'Reset Filter' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
  })

  it('calls onSearch with form values when submitting', async () => {
    render(<FilterForm onSearch={mockOnSearch} onReset={mockOnReset} />)

    // Fill in form values
    const selects = screen.getAllByTestId('mock-select')
    await act(async () => {
      fireEvent.change(selects[0], { target: { value: 'Premium' } })
      fireEvent.change(selects[1], { target: { value: 'Dark' } })
      fireEvent.change(selects[2], { target: { value: 'asc' } })
      fireEvent.change(selects[3], { target: { value: 'desc' } })
    })

    // Submit form
    const submitButton = screen.getByRole('button', { name: 'Search' })
    await act(async () => {
      fireEvent.click(submitButton)
    })

    // Wait for the next tick to allow form submission to complete
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(mockOnSearch).toHaveBeenCalledWith({
      tier: 'Premium',
      theme: 'Dark',
      time: 'asc',
      price: 'desc',
      priceRange: [50, 180],
    })
  })

  it('resets form and calls onReset when clicking reset button', () => {
    render(<FilterForm onSearch={mockOnSearch} onReset={mockOnReset} />)

    fireEvent.click(screen.getByText('Reset Filter'))

    expect(mockOnReset).toHaveBeenCalled()
  })
})
