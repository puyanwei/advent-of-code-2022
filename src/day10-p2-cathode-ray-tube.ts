/*
cycle = 1 pixel
x = sprite

cycle - x === -1 to 1 draw # (the sprite is there)
if not draw .

if cycle/40 draw newline
*/

import { programThree } from "./consts"
import { data } from "./data/cycles"
import { resolveCycleData } from "./day10-p1-cathode-ray-tube"

export function dayTenPartTwo(dataSet = data) {
  // const cycles = resolveCycleData(dataSet)
  const cycles = resolveCycleData(programThree)
  return `hello`
}
