import { Directory, File } from './types'
import { sum, writeToJson } from './utilities'

let count = 0

export function daySevenPartOne(input: string) {
  const directories = resolveDirectoryObject(input)
  const directoreiesSortedByLowestLevels = directories.sort(
    (a, b) => b.level - a.level
  )

  // stops Jest test overwriting the example JSON file
  //  if(!input.includes(`14848514 b.txt`)) writeToJson(directoreiesSortedByLowestLevels, `directories.json`)

  const updatedDirectories = updateDirectories(directoreiesSortedByLowestLevels)

  // const updatedDirectories = updateDirectoryTotals(directories)
  // const directoriesLessThan100k = updatedDirectories.filter(
  //   (directory) => directory.totalSize <= 100000
  // )
  // const total = directoriesLessThan100k.reduce(
  //   (acc, curr) => acc + curr.totalSize,
  //   0
  // )
  // return total
  return
}

function updateDirectories(directories: Directory[]) {
  const highestLevel = directories[0].level
  const levels = Array.from(Array(highestLevel).keys()).reverse()
  let resolvedDirectories: Directory[] = directories

  // interates per folder level number bottom up
  for (let index = 0; index < 1; index++) {
    resolvedDirectories = updateDirectoryTotalsForBottomLevel(
      resolvedDirectories,
      levels[index] + 1
    )
    updateDirectorySizes(resolvedDirectories, levels[index] + 1)
  }
  // console.log('DIR', JSON.stringify(resolvedDirectories[2], undefined, 2))
  return resolvedDirectories
}

interface NewSizeDetails {
  directoryName: string
  totalSize: number
  level: number
}

function updateDirectorySizes(
  directories: Directory[],
  folderLevel: number
): Directory[] {
  let newSizeDetails: NewSizeDetails[] = []

  directories.forEach(({ level, totalSize, directoryName }) => {
    if (level !== folderLevel) return
    if (totalSize === 'unknown') return
    newSizeDetails.push({ directoryName, totalSize, level })
  })

  console.log('NEW SIZE OBJ', newSizeDetails)
  return directories
}

function updateDirectoryTotalsForBottomLevel(
  directories: Directory[],
  folderLevel: number
): Directory[] {
  return directories.map((directory) => {
    if (directory.level !== folderLevel) return directory
    const totalSize = sum(directory.files.map((file) => file.size as number))
    return { ...directory, totalSize }
  })
}

export function resolveDirectoryObject(string: string): Directory[] {
  let resolvedLevel = 0
  const directories = string.split('$ cd')
  const resolvedDirectories: Directory[] = directories
    .map((lines) => {
      const [firstWord, $ls, ...fileNames] = lines.split('\n')
      const directoryName = firstWord?.trim()
      const totalSize = resolveTotalSize(fileNames)
      const files = resolveFileObject(fileNames)

      lines === ' ..\n' ? resolvedLevel-- : resolvedLevel++

      return {
        directoryName,
        files,
        totalSize,
        level: resolvedLevel,
      }
    })
    .filter((e) => e.directoryName !== '..')
  return resolvedDirectories
}

function resolveFileObject(array: string[]): File[] {
  const files: File[] = array
    .filter((e) => !e.startsWith('$'))
    .filter((e) => e !== '..')
    .filter((e) => e !== '')
    .map((fileInfo) => {
      const [firstWord, ...rest] = fileInfo.split(' ')
      // for filename fileInfo, firstWord is a number for size
      const fileName = fileInfo.startsWith('dir') ? fileInfo : rest.join()
      const size = fileInfo.startsWith('dir') ? 'unknown' : parseInt(firstWord)
      const type = fileInfo.startsWith('dir') ? 'folder' : 'file'

      return {
        fileName,
        size,
        type,
      }
    })
  return files
}

function resolveTotalSize(lines: string[]): number | 'unknown' {
  const sizes = lines
    .filter((e) => !e.length)
    .filter((e) => e !== '')
    .filter((e) => e !== '..')
    .map((line) => {
      const [firstWord] = line.split(' ')
      return parseInt(firstWord) ? parseInt(firstWord) : 'unknown'
    })
  if (!sizes.length || !sizes) return 'unknown'
  if (sizes.some((e) => e === 'unknown')) return 'unknown'
  return sizes.reduce((acc, curr) => (acc as number) + (curr as number), 0)
}
