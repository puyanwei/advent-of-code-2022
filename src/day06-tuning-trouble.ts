import { data } from './data/tuning'

export function daySixPartOne() {
  return resolveMarker({ string: data })
}
export function daySixPartTwo() {
  return resolveMarkerMessages({ string: data })
}
interface ResolveMarker {
  string: string
  count?: number
}

export function resolveMarker({ string }: ResolveMarker): number {
  let count = 0
  const currentPacket = getCharacters(string, count, 4)
  const hasUniqueCharacters = new Set(currentPacket).size === 4

  // No duplicates found by end of string
  if (string.length === count - 4) return 0

  if (!hasUniqueCharacters) {
    count++
    const start = count
    return resolveMarker({ string })
  }
  return count + 4
}

export function resolveMarkerMessages({
  string,
  count: resolvedCount = 0,
}: ResolveMarker): number {
  let count = resolvedCount
  const currentPacket = getCharacters(string, count, 14)
  const hasUniqueCharacters = new Set(currentPacket).size === 14

  // No duplicates found by end of string
  if (string.length === count - 14) return 0

  if (!hasUniqueCharacters) {
    count++
    const start = count
    return resolveMarkerMessages({ string, count })
  }
  return count + 14
}

export function getCharacters(
  string: string,
  start: number,
  wordLength: number
): string {
  return string.slice(start, start + wordLength)
}
