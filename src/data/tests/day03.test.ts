import { checkDuplicateLetter } from '../../day03-rucksack-reorganization'

describe('checkDuplicateLetter()', () => {
  it('returns the letter which is duplicated in both words', () => {
    expect(checkDuplicateLetter('hello', 'bye')).toBe('e')
    expect(checkDuplicateLetter('123', '345')).toBe('3')
  })
  it('returns an empty string if no letter found', () => {
    expect(checkDuplicateLetter('www', '`zzz`')).toBe('')
  })
  it('returns the letter which is duplicated in all three words', () => {
    expect(checkDuplicateLetter('zxy', 'yboo', 'yvv')).toBe('y')
    expect(
      checkDuplicateLetter(
        'vJrwpWtwJgWrhcsFMMfFFhFp',
        'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
        'PmmdzqPrVvPwwTWBwg'
      )
    ).toBe('r')
    expect(
      checkDuplicateLetter(
        'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
        'ttgJtRGJQctTZtZT',
        'CrZsJsPPZsGzwwsLwLmpwMDw'
      )
    ).toBe('Z')
  })
})
