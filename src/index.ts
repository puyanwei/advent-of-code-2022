import { dayOnePartOne, dayOnePartTwo } from "./day01-calorie-counting"
import { dayTwoPartOne, dayTwoPartTwo } from "./day02-rps"
import { dayThreePartOne, dayThreePartTwo } from "./day03-rucksack-reorganization"
import { dayFourPartOne, dayFourPartTwo } from "./day04-camp-cleanup"
import { dayFivePartOne, dayFivePartTwo } from "./day05-supply-stacks"
import { daySixPartOne, daySixPartTwo } from "./day06-tuning-trouble"
import { daySevenPartOne } from "./day07-no-space-left"
import { dayEightPartOne } from "./day08-p1 - tree-top-tree-house"
import { dayEightPartTwo } from "./day08-p2 - tree-top-tree-house"
import { dayNinePartOne } from "./day09-p1-rope-bridge"
import { dayNinePartTwo } from "./fails/day09-p2-rope-bridge.FAIL"

console.warn(`Day 1 part 1 - Highest calories is ${dayOnePartOne()}`)
console.warn(`Day 1 part 2 - Total calories of top 3 is ${dayOnePartTwo()}`)
console.warn(`Day 2 part 1 - The sum of all the points are ${dayTwoPartOne()}`)
console.warn(`Day 2 part 1 - The second sum of all the points are ${dayTwoPartTwo()}`)
console.warn(`Day 3 part 1 - The sum of the priority items are ${dayThreePartOne()}`)
console.warn(`Day 3 part 2 - The sum of the authenticity stickers are ${dayThreePartTwo()}`)
console.warn(
  `Day 4 part 1 - The number of cleaning sections within another are ${dayFourPartOne()}`
)
console.warn(`Day 4 part 2 - The number of overlapped cleaning sections are ${dayFourPartTwo()}`)
console.warn(
  `Day 5 part 1 - The top crates from all the stacks using the CraneMover 9000 are ${dayFivePartOne()}`
)
console.warn(
  `Day 5 part 2 - The top crates from all the stacks using the CraneMover 9001 are ${dayFivePartTwo()}`
)
console.warn(`Day 6 part 1 - The first marker appears after character ${daySixPartOne()}`)
console.warn(`Day 6 part 2 - The first message marker appears after character ${daySixPartTwo()}`)
console.warn(
  `Day 8 part 1 - The number of trees that are visible from outside the grid are ${dayEightPartOne()}`
)
console.warn(`Day 8 part 2 - The highest scenic score for a tree is ${dayEightPartTwo()}`)
console.warn(`Day 9 part 1 - The tail visited ${dayNinePartOne()} positions at least once`)

/* FAILS!
// console.warn(
  `Day 6 part 1 - The sum of the total sizes of directories under 100k is ${daySevenPartOne()}`
  )
  console.warn(`Day 9 part 2 - The tail visited ${dayNinePartTwo()} positions at least once`)
*/
