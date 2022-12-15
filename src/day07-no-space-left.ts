import { commands } from './consts'
import { Directory, File } from './types'

export function daySevenPartOne() {
  const directories = resolveDirectories(commands)
  const total = directories.reduce((acc, curr) => acc + curr.totalSize, 0)
  console.log(directories, { maxArrayLength: null })
  directories.forEach((e) => console.log(e))
  return total
}
export function resolveDirectories(string: string): Directory[] {
  const directories = string.split('$ cd')
  const resolvedDirectories = directories
    .map((lines) => {
      const [resolvedDirectoryName, ls, ...files] = lines
        .split('\n')
        .filter((e) => e !== ' ..')
        .filter((e) => e !== '')
      const directoryName = resolvedDirectoryName?.trim()
      const totalSize = resolveTotalSizeUnder100k(files)
      // const resolvedTotalSize = updateToIncludeDirectorySizes(totalSize) // TODO: Update the dir sizes
      return {
        directoryName,
        files: resolveFileObj(files),
        totalSize,
      }
    })
    .filter((e) => e.directoryName !== undefined)

  console.log({ resolvedDirectories })
  return resolvedDirectories
}

function resolveFileObj(array: string[]): File[] {
  const files = array.map((file) => {
    const [first, ...rest] = file.split(' ')

    const fileName = first === 'dir' ? file : rest.join()
    const size = first === 'dir' ? 0 : parseInt(first)

    return {
      fileName,
      size,
    }
  })
  return files
}

function resolveTotalSizeUnder100k(files: string[]): number {
  if (!files.length) return 0
  const sizes = files
    .map((e) => {
      const [first, ...rest] = e.split(' ')
      if (first !== 'dir' && parseInt(first) < 100000) return parseInt(first)
      return 0
    })
    .filter((e) => e !== undefined)
  if (!sizes.length || !sizes) return 0
  const total = sizes.reduce((acc, curr) => acc + curr, 0)
  return total
}
