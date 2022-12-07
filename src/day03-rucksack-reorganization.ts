import { pointsMapper } from './consts/pointsMapper'
import { dayTwoData } from './data/rucksack'

interface RuckSack {
  leftCompartment: string
  rightCompartment: string
  duplicateLetter: string
}

export function dayThreePartOne() {
  const arrayOfRuckSacks: string[] = dayTwoData.split(`\n`)
  const ruckSacks = resolveRuckSacks(arrayOfRuckSacks)
  const sumOfPointsFromDuplicateLetters = ruckSacks.reduce((acc, curr) => {
    const points = acc + pointsMapper[curr.duplicateLetter]
    return points
  }, 0)
  return sumOfPointsFromDuplicateLetters
}

function resolveRuckSacks(array: string[]): RuckSack[] {
  return array.map((string) => {
    const middle = Math.floor(string.length / 2)
    const leftCompartment = string.slice(0, middle)
    const rightCompartment = string.slice(middle)

    const duplicateLetter = checkDuplicateLetter(
      leftCompartment,
      rightCompartment
    )
    return {
      leftCompartment,
      rightCompartment,
      duplicateLetter,
    }
  })
}

export function checkDuplicateLetter(first: string, second: string): string {
  const arrayOfDuplicates = first.split('').filter((letter: string) => {
    if (second.includes(letter)) return letter
  })
  return arrayOfDuplicates[0] || ''
}
