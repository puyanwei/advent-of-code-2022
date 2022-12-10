import { dayOnePartOne, dayOnePartTwo } from './day01-calorie-counting'
import { dayTwoPartOne, dayTwoPartTwo } from './day02-rps'
import {
  dayThreePartOne,
  dayThreePartTwo,
} from './day03-rucksack-reorganization'
import { dayFourPartOne, dayFourPartTwo } from './day04-camp-cleanup'

console.warn(`Day 1 part 1 - Highest calories is ${dayOnePartOne()}`)
console.warn(`Day 1 part 2 - Total calories of top 3 is ${dayOnePartTwo()}`)
console.warn(`Day 2 part 1 - The sum of all the points are ${dayTwoPartOne()}`)
console.warn(
  `Day 2 part 1 - The second sum of all the points are ${dayTwoPartTwo()}`
)
console.warn(
  `Day 3 part 1 - The sum of the priority items are ${dayThreePartOne()}`
)
console.warn(
  `Day 3 part 2 - The sum of the authenticity stickers are ${dayThreePartTwo()}`
)
console.warn(
  `Day 4 part 1 - The number of cleaning sections within another are ${dayFourPartOne()}`
)
console.warn(
  `Day 4 part 2 - The number of overlapped cleaning sections are ${dayFourPartTwo()}`
)
