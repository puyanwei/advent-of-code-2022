import { data } from './data/tuning'
import { ResolveMarker } from './types'

export function daySixPartOne() {
  return resolveMarker({ string: data, wordLength: 4 })
}
export function daySixPartTwo() {
  return resolveMarker({ string: data, wordLength: 14 })
}

export function resolveMarker({
  string,
  count: resolvedCount = 0,
  wordLength,
}: ResolveMarker): number {
  let count = resolvedCount
  const currentPacket = getCharacters(string, count, wordLength)
  const hasUniqueCharacters = new Set(currentPacket).size === wordLength

  // No duplicates found by end of string
  if (string.length === count - wordLength) return 0

  if (!hasUniqueCharacters) {
    count++
    const start = count
    return resolveMarker({ string, count, wordLength })
  }
  return count + wordLength
}

export function getCharacters(
  string: string,
  start: number,
  wordLength: number
): string {
  return string.slice(start, start + wordLength)
}
