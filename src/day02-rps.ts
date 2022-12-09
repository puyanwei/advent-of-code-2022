import { RPSMap, rpsMatchPointsMap } from './consts'
import { data } from './data/rps'
import { RPSMatch, RPS } from './types'

export function dayTwoPartOne() {
  const groupByNewLine = data.split('\n')
  const rpsMatches = resolveRPSMatches(groupByNewLine)
  const totalScore = rpsMatches.reduce((acc, curr) => (acc += curr.score), 0)
  return totalScore
}

function resolveRPSMatches(array: string[]): RPSMatch[] {
  return array.map((match) => {
    const result: string[] = match.split(` `)
    const [opponent, hero] = result
    const points = result.join('')

    return {
      hero: RPSMap[hero] as RPS,
      opponent: RPSMap[opponent] as RPS,
      score: rpsMatchPointsMap[points],
    }
  })
}
