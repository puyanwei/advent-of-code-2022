import { program } from "./consts"

export function dayTenPartOne(data = program) {
  resolveCycleData(data)
  return "some number!"
}

interface Cycle {
  cycle: number
  command: string
  x: number
}

export function resolveCycleData(data: string) {
  const commands = data.split(`\n`)

  let x = 1
  let cycle = 0

  const cycleData = commands
    .map((command) => {
      if (command.includes(`addx`)) {
        const [addXWord, number] = command.split(` `)
        const addxCycle = [
          {
            cycle: cycle + 1,
            command,
            x,
          },
          {
            cycle: cycle + 2,
            command,
            x,
          },
        ]
        x = x + parseInt(number)
        cycle = cycle + 2
        return addxCycle
      }
      if (command.includes(`noop`)) {
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
    })
    .flat(1)
  console.log({ cycleData, finalXValue: x })
  return cycleData
}
