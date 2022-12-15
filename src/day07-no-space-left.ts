import { commands } from './consts'

export function daySevenPartOne() {
  getFileSizes(commands)
}
export function getFileSizes(string: string): number {
  const directories = string.split('$ cd')
  const resolvedDirectories = directories
    .map((lines) => {
      const [directoryName, ls, ...children] = lines
        .split('\n')
        .filter((e) => e !== ' ..')
        .filter((e) => e !== '')

      return {
        directoryName,
        children,
      }
    })
    .filter((e) => e.directoryName !== undefined)
  console.log(resolvedDirectories, { maxArrayLength: null })
  return 0
}
