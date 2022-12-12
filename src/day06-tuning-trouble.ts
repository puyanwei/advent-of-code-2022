import { data } from './data/tuning'

export function daySixPartOne() {
  return resolveMarker({ string: data })
}
interface ResolveMarker {
  string: string
  start?: number
}

export function resolveMarker({ string, start = 0 }: ResolveMarker): number {
  let count = start
  const currentPacket = getFourCharacters(string, count)
  const hasDuplicates = new Set(currentPacket).size !== 4

  // No duplicates found by end of string
  if (string.length === count - 4) return 0

  if (hasDuplicates) {
    count++
    const start = count
    return resolveMarker({ string, start })
  }
  return count + 4
}

export function getFourCharacters(string: string, start: number): string {
  return string.slice(start, start + 4)
}
