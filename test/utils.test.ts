import { it, expect } from 'vitest'

import { formatDuration } from '@/utils'

it('Formats duration properly', () => {
  const second = 1000
  const minute = 60 * second
  const hour = 60 * minute

  //zero
  expect(formatDuration(0)).toBe('0')
  expect(formatDuration(500)).toBe('0')

  //only seconds
  expect(formatDuration(second)).toBe('1')
  expect(formatDuration(59 * second)).toBe('59')

  //minutes
  expect(formatDuration(minute)).toBe('1:00')
  expect(formatDuration(59 * minute)).toBe('59:00')
  expect(formatDuration(59 * minute + 27 * second)).toBe('59:27')

  //hours
  expect(formatDuration(hour)).toBe('1:00:00')
  expect(formatDuration(3 * hour)).toBe('3:00:00')
  expect(formatDuration(3 * hour + 27 * second)).toBe('3:00:27')
  expect(formatDuration(3 * hour + 59 * minute)).toBe('3:59:00')
  expect(formatDuration(3 * hour + 59 * minute + 27 * second)).toBe('3:59:27')
})
