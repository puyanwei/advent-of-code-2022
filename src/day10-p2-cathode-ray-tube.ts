/*
cycle = 1 pixel
x = sprite

cycle - x === -1 to 1 draw # (the sprite is there)
if not draw .

if cycle/40 draw newline
*/

import { data } from "./data/cycles"
import { resolveCycleData } from "./day10-p1-cathode-ray-tube"
import { Cycle } from "./types"

export function dayTenPartTwo(dataSet = data) {
  const cycles = resolveCycleData(dataSet)
  return resolvePixels(cycles)
}

export function resolvePixels(cycles: Cycle[]): string {
  const string = cycles
    .map(({ cycle, x }, index) => {
      const lineNumber = Math.ceil(cycle / 40)
      const newX = (lineNumber - 1) * 40 + x + 1
      const middleSpritePosition = cycle - newX
      const symbol = middleSpritePosition < 2 && middleSpritePosition > -2 ? `#` : `.`
      if (index === 0) return `\n${symbol}`
      if (index === cycles.length - 1) return `${symbol}`
      return cycle % 40 === 0 ? `${symbol}\n` : `${symbol}`
    })
    .join(``)
  return string
}
