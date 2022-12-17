import { Directory, File } from './types'

export function daySevenPartOne(input: string) {
  const directories = resolveDirectoryObject(input)
  const updatedDirectories = updateDirectoryTotals(directories)
  // updatedDirectories.map((e) => console.log(e))
  const total = updatedDirectories.reduce(
    (acc, curr) => (curr.totalSize < 100000 ? acc + curr.totalSize : acc + 0),
    0
  )
  return total
}

function updateDirectoryTotals(directories: Directory[]) {
  const directoryIndexMap = resolveDirectoryIndexMap(directories)
  const rootDirectoryIndex = directoryIndexMap['/']
  const numberOfDirectoriesToUpdate = Object.keys(directoryIndexMap).length
  let newDirectory = directories

  for (let index = 0; index < numberOfDirectoriesToUpdate; index++) {
    const directoryToUpdate = findDirectorySize(
      newDirectory,
      rootDirectoryIndex
    )
    console.log(222222222, directoryIndexMap)
    console.log(7777777, directoryToUpdate.directoryName)
    newDirectory = updatedDirectories(newDirectory, directoryToUpdate)
  }
  return newDirectory
}

function updatedDirectories(
  directories: Directory[],
  directoryToUpdate: DirectorySize
) {
  const updatedDirectories: Directory[] = directories.map((directory) => {
    const updatedFiles = directory.files.map((file) => {
      return file.fileName === `dir ${directoryToUpdate.directoryName}`
        ? { ...file, size: directoryToUpdate.totalSize }
        : file
    })
    return { ...directory, files: [...updatedFiles] }
  })
  return updatedDirectories
}

function resolveDirectoryIndexMap(directories: Directory[]) {
  const obj: Record<string, number> = {}
  directories.forEach((directory, index) => {
    return (obj[directory.directoryName] = index)
  })
  return obj
}

interface DirectorySize {
  directoryName: string
  totalSize: number
}

function findDirectorySize(
  directories: Directory[],
  directoryIndex: number
): DirectorySize {
  const directoryWithNoSize = directories[directoryIndex].files.find(
    (file) => file.size === 0
  )
  if (!!directoryWithNoSize?.fileName) {
    const newTargetDirectory = getAllButLastWord(
      directoryWithNoSize.fileName,
      ' '
    )
    const targetDirectoryIndex =
      resolveDirectoryIndexMap(directories)[newTargetDirectory]

    return findDirectorySize(directories, targetDirectoryIndex)
  }
  return {
    directoryName: directories[directoryIndex].directoryName,
    totalSize: directories[directoryIndex].totalSize,
  }
}

export function resolveDirectoryObject(string: string): Directory[] {
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
