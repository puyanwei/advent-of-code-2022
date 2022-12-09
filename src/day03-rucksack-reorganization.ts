import { alphabetrpsMatchPointsMapper } from './consts'
import { dayThreeData } from './data/rucksack'
import { RuckSack, RuckSackTeams } from './types'

export function dayThreePartOne() {
  const arrayOfRuckSacks: string[] = dayThreeData.split(`\n`)
  const ruckSacks = resolveRuckSacks(arrayOfRuckSacks)
  const sumOfPointsFromDuplicateLetters = ruckSacks.reduce((acc, curr) => {
    const points = acc + alphabetrpsMatchPointsMapper[curr.duplicateLetter]
    return points
  }, 0)
  return sumOfPointsFromDuplicateLetters
}

export function dayThreePartTwo() {
  const arrayOfRuckSacks: string[] = dayThreeData.split(`\n`)
  const ruckSackTeams = resolveRucksackTeams(arrayOfRuckSacks)

  const sumOfPointsFromAuthenticityStickers = ruckSackTeams.reduce(
    (acc, curr) => {
      const points =
        acc + alphabetrpsMatchPointsMapper[curr.authenticitySticker]
      return points
    },
    0
  )
  return sumOfPointsFromAuthenticityStickers
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

export function checkDuplicateLetter(
  first: string,
  second: string,
  third?: string
): string {
  const duplicateLetterFromTwoWords = first
    .split('')
    .filter((letter: string) => {
      if (second.includes(letter)) return letter
    })
  if (!third) return duplicateLetterFromTwoWords[0] || ''

  const duplicateLetterFromThreeWords = third
    .split('')
    .filter((letter: string) => {
      const dupedLetters = duplicateLetterFromTwoWords.join('')
      if (dupedLetters.includes(letter)) return letter
    })

  return duplicateLetterFromThreeWords[0] || ''
}

function resolveRucksackTeams(array: string[]): RuckSackTeams[] {
  const teams: RuckSackTeams[] = []
  for (let i = 0; i < array.length; i += 3) {
    const team = array.slice(i, i + 3)
    const [first, second, third] = team
    const authenticitySticker = checkDuplicateLetter(first, second, third)
    teams.push({ team, authenticitySticker })
  }
  return teams
}
