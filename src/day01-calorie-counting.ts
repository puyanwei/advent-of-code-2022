import { calories } from './data/calories'

interface ElfInventory {
  elfNumber: number
  food: number[]
  total: number
}

export function dayOnePartOne() {
  const groupByNewLine: string[] = calories.split('\n').join(' ').split('  ')

  const elfInventory: ElfInventory[] = groupByNewLine.map((element, index) => {
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
  const highestCalorie = Math.max(...elfInventory.map((elf) => elf.total))

  return highestCalorie
}
