import { programThree } from "./consts"
import { data } from "./data/cycles"
import { sum } from "./helpers"
import { Cycle } from "./types"

export function dayTenPartOne(dataSet = data) {
  const cycles = resolveCycleData(programThree)
  // note that the very last command has x's value but doesn't make an object in the cycle array

  const signalStrengths = [
    resolveXFromCycle(cycles, 20) * 20,
    resolveXFromCycle(cycles, 60) * 60,
    resolveXFromCycle(cycles, 100) * 100,
    resolveXFromCycle(cycles, 140) * 140,
    resolveXFromCycle(cycles, 180) * 180,
    resolveXFromCycle(cycles, 220) * 220,
  ]
  return sum(signalStrengths)
}

export function resolveCycleData(data: string): Cycle[] {
  let x = 1
  let cycle = 0
  const commands = data.split(`\n`)
  const cycleData = commands
    .map((command) => {
      if (command.includes(`addx`)) return resolveAddX(command)
      if (command.includes(`noop`)) return resolveNoop(command)
      throw new Error(`Command not recognized`)
    })
    .flat(1)
  return cycleData

  function resolveAddX(command: string) {
    const [addXWord, number] = command.split(` `)
    if (!number) throw new Error(`No addX number found`)
    const addxCycle = [
      {
        cycle: cycle + 1,
        command,
        x,
      },
      {
        cycle: cycle + 2,
        command: "[pending]",
        x,
      },
    ]
    x = x + parseInt(number)
    cycle = cycle + 2
    return addxCycle
  }

  function resolveNoop(command: string) {
    const noopCycle = [
      {
        cycle: cycle + 1,
        command,
        x,
      },
    ]
    cycle++
    return noopCycle
  }
}

export function resolveXFromCycle(array: Cycle[], cycle: number) {
  const matchedCycle = array.filter((obj) => obj.cycle === cycle)
  if (matchedCycle.length !== 1) throw new Error(`Cycle number does not exist`)
  if (matchedCycle.length > 1) throw new Error(`There should not be duplicate cycle numbers`)
  return matchedCycle[0].x
}

/* 
// Practicing reduce here but doesn't seem to 'reduce' the code that much. In removing the let data of x and cycle what I should be doing is returning the new values of the resolvers in the tuple

export function resolveCycleData(data: string) {
  const commands = data.split(`\n`)

  const initialValue: InitialValue = { data: [], x: 1, cycle: 0 }
  const { data: result } = commands.reduce((previous, command) => {
    if (command.includes(`noop`)) {
      const noopCycle = [
        {
          cycle: previous.cycle + 1,
          command,
          x: previous.x,
        },
      ]
      const newCycle = previous.cycle + 1
      const newX = previous.x
      return {
        data: [...previous.data, ...noopCycle],
        x: newX,
        cycle: newCycle,
      }
    }
    if (command.includes(`addx`)) {
      const [addXWord, number] = command.split(` `)
      if (!number) throw new Error(`No addX number found`)
      const addxCycle = [
        {
          cycle: previous.cycle + 1,
          command,
          x: previous.x,
        },
        {
          cycle: previous.cycle + 2,
          command: "[pending]",
          x: previous.x,
        },
      ]
      const newX = previous.x + parseInt(number)
      const newCycle = previous.cycle + 2
      return {
        data: [...previous.data, ...addxCycle],
        x: newX,
        cycle: newCycle,
      }
    }
    return previous
  }, initialValue)

  return result
}
*/
