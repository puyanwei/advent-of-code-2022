import { commands } from './consts'
import { Directory, File } from './types'

export function daySevenPartOne() {
  const directories = resolveDirectories(commands)
  const updatedDirectories = updateDirectoryTotals(directories)
  const total = directories.reduce((acc, curr) => acc + curr.totalSize, 0)
  directories.forEach((e) => console.log(e))
  return total
}

function updateDirectoryTotals(directories: Directory[]) {
  /* 
0. Create map to index the diff directories
1. start at top ('/')
2. total up files => if all files are total aka no size == 0 then stop loop
3. if first word dir and size === 0, use name to refernce that directory
4. attempt to sum up that directory. If successful recurse
5. Recursion should end at '/' no matter what, with a success or fail
*/

  const directoryIndexMap = resolveDirectoryIndexMap(directories)
  const rootDirectoryIndex = directoryIndexMap['/']
  console.log(666666666, findDirectorySize(directories, rootDirectoryIndex))
  return {}
}

function resolveDirectoryIndexMap(directories: Directory[]) {
  const obj: Record<string, number> = {}
  directories.forEach(
    ({ directoryName }, index) => (obj[directoryName] = index)
  )
  return obj
}

interface DirectorySize {
  directoryName: string
  totalSize: number
}

function findDirectorySize(
  directories: Directory[],
  directoryIndex: number
): DirectorySize | void {
  const directoryWithNoSize = directories[directoryIndex].files.find(
    (file) => file.size === 0
  )

  if (!directoryWithNoSize) {
    console.log('HERE??')
    return {
      directoryName: directories[directoryIndex].directoryName,
      totalSize: directories[directoryIndex].totalSize,
    }
  }

  const newTargetDirectory = getAllButLastWord(
    directoryWithNoSize.fileName,
    ' '
  )
  const targetDirectoryIndex =
    resolveDirectoryIndexMap(directories)[newTargetDirectory]

  console.log(99999999999, directories[targetDirectoryIndex].directoryName)
  findDirectorySize(directories, targetDirectoryIndex)
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
      const totalSize = resolveTotalSize(files)
      return {
        directoryName,
        files: resolveFileObject(files),
        totalSize,
      }
    })
    .filter((e) => e.directoryName !== undefined)

  return resolvedDirectories
}

function resolveFileObject(array: string[]): File[] {
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

function resolveTotalSize(files: string[]): number {
  if (!files.length) return 0
  const sizes = files
    .map((e) => {
      const [first, ...rest] = e.split(' ')
      if (first !== 'dir') return parseInt(first)
      return 0
    })
    .filter((e) => e !== undefined)
  if (!sizes.length || !sizes) return 0
  const total = sizes.reduce((acc, curr) => acc + curr, 0)
  return total
}

function getFirstWord(string: string, splitCondition: string) {
  return string.split(splitCondition)[0]
}

function getAllButLastWord(string: string, splitCondition: string) {
  const [first, ...rest] = string.split(splitCondition)
  return rest.join()
}
