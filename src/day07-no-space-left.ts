import { Directory, File } from './types'

export function daySevenPartOne(input: string) {
  const directories = resolveDirectoryObject(input)
  const updatedDirectories = updateDirectoryTotals(directories)
  const directoriesLessThan100k = updatedDirectories.filter(
    (directory) => directory.totalSize < 100000
  )
  const total = directoriesLessThan100k.reduce(
    (acc, curr) => acc + curr.totalSize,
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
    console.log({ iterationNumber: index })
    const directoryToUpdate =
      findLowestDirectoryWithNoChildDirectoriesTotalSize(
        newDirectory,
        rootDirectoryIndex
      )
    newDirectory = updateDirectories(newDirectory, directoryToUpdate)
  }
  return newDirectory
}

function updateDirectories(
  directories: Directory[],
  directoryToUpdate: DirectorySize
) {
  const updatedDirectories: Directory[] = directories.map((directory) => {
    // updates `dir [name]` files with a size
    const updatedFiles = directory.files.map((file) => {
      const directoryAsFileName = `dir ${directoryToUpdate.directoryName}`
      return file.fileName === directoryAsFileName
        ? { ...file, size: directoryToUpdate.totalSize }
        : file
    })
    const newTotalSize = updatedFiles.reduce((acc, curr) => acc + curr.size, 0)
    return { ...directory, files: updatedFiles, totalSize: newTotalSize }
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

function findLowestDirectoryWithNoChildDirectoriesTotalSize(
  directories: Directory[],
  directoryIndex: number
): DirectorySize {
  const directoryWithNoSize = directories[directoryIndex].files.find(
    (file) => file.size === 0
  )

  /* Keeps recursively checking for directories without a size in it's children until there isn't any. Then once there is none we can be confident that directory has a file size and no dependent file directories on it, so we update the file size and return it to be updated in all other areas
   */

  if (!!directoryWithNoSize?.fileName) {
    const newTargetDirectory = getAllButLastWord(
      directoryWithNoSize.fileName,
      ' '
    )

    const targetDirectoryIndex =
      resolveDirectoryIndexMap(directories)[newTargetDirectory]

    return findLowestDirectoryWithNoChildDirectoriesTotalSize(
      directories,
      targetDirectoryIndex
    )
  } else {
    const lowestDirectoryInFileTree = directories[directoryIndex]

    const newTotalSize = lowestDirectoryInFileTree.files.reduce(
      (acc, curr) => acc + curr.size,
      0
    )
    const resolvedDirectory = {
      ...lowestDirectoryInFileTree,
      totalSize: newTotalSize,
    }
    console.log({ directory: resolvedDirectory })
    return resolvedDirectory
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
