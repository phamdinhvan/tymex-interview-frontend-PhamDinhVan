import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial value', 500))
    expect(result.current).toBe('initial value')
  })

  it('should debounce value updates', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial value', delay: 500 },
      },
    )

    // Initial value should be set immediately
    expect(result.current).toBe('initial value')

    // Update the value
    rerender({ value: 'updated value', delay: 500 })

    // Value should not have changed yet
    expect(result.current).toBe('initial value')

    // Fast forward time
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Now the value should be updated
    expect(result.current).toBe('updated value')
  })

  it('should handle multiple rapid updates', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      },
    )

    // Multiple rapid updates
    rerender({ value: 'update 1', delay: 500 })
    rerender({ value: 'update 2', delay: 500 })
    rerender({ value: 'final update', delay: 500 })

    // Value should not have changed yet
    expect(result.current).toBe('initial')

    // Fast forward time
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Should only have the last update
    expect(result.current).toBe('final update')
  })

  it('should cleanup timeout on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout')
    const { unmount } = renderHook(() => useDebounce('test', 500))

    unmount()

    expect(clearTimeoutSpy).toHaveBeenCalled()
    clearTimeoutSpy.mockRestore()
  })

  it('should handle different delay values', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      },
    )

    // Update with different delay
    rerender({ value: 'updated', delay: 1000 })

    // Fast forward 500ms
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Value should not have changed yet
    expect(result.current).toBe('initial')

    // Fast forward remaining 500ms
    act(() => {
      jest.advanceTimersByTime(500)
    })

    // Now the value should be updated
    expect(result.current).toBe('updated')
  })
})
