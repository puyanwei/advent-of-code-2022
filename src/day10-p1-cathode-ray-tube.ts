import { programThree } from "./consts"
import { data } from "./data/cycles"
import { logObject, sum } from "./helpers"
import { Cycle, ReducerInitialValue, ResolveCommand } from "./types"

export function dayTenPartOne(dataSet = data) {
  const cycles = resolveCycleData(dataSet)

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

export function resolveCycleData(data: string) {
  const commands = data.split(`\n`)

  const reducerInitialValue: ReducerInitialValue = { data: [], x: 1, cycle: 0 }

  const { data: result } = commands.reduce((previous, command) => {
    if (command.includes(`noop`)) {
      const {
        data: noopCycle,
        cycle,
        x,
      } = resolveNoop({ command, cycle: previous.cycle, x: previous.x })
      return {
        data: [...previous.data, ...noopCycle],
        x,
        cycle,
      }
    }
    if (command.includes(`addx`)) {
      const {
        data: addxCycle,
        cycle,
        x,
      } = resolveAddX({ command, cycle: previous.cycle, x: previous.x })
      return {
        data: [...previous.data, ...addxCycle],
        x,
        cycle,
      }
    }
    return previous
  }, reducerInitialValue)
  return result
}

export function resolveAddX({ command, cycle, x }: Cycle): ResolveCommand {
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
  return { data: addxCycle, cycle, x }
}

function resolveNoop({ command, cycle, x }: Cycle): ResolveCommand {
  const noopCycle = [
    {
      cycle: cycle + 1,
      command,
      x,
    },
  ]
  cycle++
  return {
    data: noopCycle,
    cycle,
    x,
  }
}

export function resolveXFromCycle(array: Cycle[], cycle: number) {
  const matchedCycle = array.filter((obj) => obj.cycle === cycle)
  if (matchedCycle.length !== 1) throw new Error(`Cycle number does not exist`)
  if (matchedCycle.length > 1) throw new Error(`There should not be duplicate cycle numbers`)
  return matchedCycle[0].x
}
