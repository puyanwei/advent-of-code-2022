import { dayOneData } from './data/calories'
import { ElfInventory } from './types'

export function dayOnePartOne() {
  const groupByNewLine: string[] = dayOneData.split('\n').join(' ').split('  ')
  const elfInventory = resolveElfInventory(groupByNewLine)
  const highestCalorie = Math.max(...elfInventory.map((elf) => elf.total))
  return highestCalorie
}

export function dayOnePartTwo() {
  const groupByNewLine: string[] = dayOneData.split('\n').join(' ').split('  ')
  const elfInventory = resolveElfInventory(groupByNewLine)
  const elfInventorySorted = elfInventory.sort((a, b) => b.total - a.total)

  const first = elfInventorySorted[0].total
  const second = elfInventorySorted[1].total
  const third = elfInventorySorted[2].total

  return first + second + third
}

function resolveElfInventory(array: string[]): ElfInventory[] {
  return array.map((element, index) => {
    const food: number[] = element.split(' ').map((numberAsString) => {
      if (numberAsString === '') return 0
      if (numberAsString === undefined) return 0
      return parseInt(numberAsString)
    })

    const total = food.reduce((acc, curr) => acc + curr, 0)

    return {
      elfNumber: index + 1,
      food,
      total,
    }
  })
}
