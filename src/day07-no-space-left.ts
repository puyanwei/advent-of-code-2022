import { Directory, File } from './types'
import { writeToJson } from './utilities/writeToJson'

let count = 0

export function daySevenPartOne(input: string) {
  const directories = resolveDirectoryObject(input)
  const directoreiesSortedByLowestLevels = directories.sort(
    (a, b) => a.level - b.level
  )
  writeToJson(directoreiesSortedByLowestLevels, `directories.json`)

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

// function updateDirectoryTotals(directories: Directory[]) {
//   const directoryIndexMap = resolveDirectoryIndexMap(directories)
//   const rootDirectoryIndex = directoryIndexMap['/']
//   // const numberOfDirectoriesToUpdate = Object.keys(directoryIndexMap).length
//   const numberOfDirectoriesToUpdate = 65
//   let newDirectories = directories
//   for (let index = 0; index < numberOfDirectoriesToUpdate; index++) {
//     const directoryToUpdate =
//       findLowestDirectoryUpdateSizeAndReturnItToBeUpdatedElsewhere(
//         newDirectories,
//         rootDirectoryIndex
//       )
//     // console.log('DIRECTORY TO UPDATE', directoryToUpdate)
//     // if (index === 64) writeToJson(newDirectories, `directories.json`)
//     newDirectories = updateDirectories(newDirectories, directoryToUpdate)
//   }
//   // writeToJson(newDirectories, `directories.json`)
//   return newDirectories
// }

// function updateDirectories(
//   directories: Directory[],
//   directoryToUpdate: DirectorySize
// ) {
//   const updatedDirectories: Directory[] = directories.map((directory) => {
//     const updatedFiles = directory.files.map((file) => {
//       const directoryAsFileName = `dir ${directoryToUpdate.directoryName}`
//       const isMatchedDirectoryToUpdate =
//         file.fileName === directoryAsFileName && file.fileName.startsWith('dir')

//       // console.log(
//       //   'IS MATCHING',
//       //   isMatchedDirectoryToUpdate,
//       //   directoryAsFileName,
//       //   '=>',
//       //   file.fileName
//       // )
//       return isMatchedDirectoryToUpdate
//         ? { ...file, size: directoryToUpdate.totalSize }
//         : file
//     })
//     const newTotalSize = updatedFiles.reduce((acc, curr) => acc + curr.size, 0)
//     const updatedDirectory = {
//       ...directory,
//       files: updatedFiles,
//       totalSize: newTotalSize,
//     }
//     return updatedDirectory
//   })
//   return updatedDirectories
// }

// function resolveDirectoryIndexMap(directories: Directory[]) {
//   const obj: Record<string, number> = {}
//   directories.forEach((directory, index) => {
//     return (obj[directory.directoryName] = index)
//   })
//   return obj
// }

// interface DirectorySize {
//   directoryName: string
//   totalSize: number
// }

// function findLowestDirectoryUpdateSizeAndReturnItToBeUpdatedElsewhere(
//   directories: Directory[],
//   directoryIndex: number
// ): DirectorySize {
//   // console.log(`PARENTS`, directories[directoryIndex].directoryName)
//   const directoryWithNoSize = directories[directoryIndex].files.find(
//     (file) => file.size === 0 && file.fileName.startsWith('dir')
//   )

//   /* Keeps recursively checking for directories without a size in it's children until there isn't any. Then once there is none we can be confident that directory has a file size and no dependent file directories on it, so we update the file size and return it to be updated in all other areas
//    */

//   if (!!directoryWithNoSize) {
//     // console.log(
//     //   `INTERATION NO. ${count} - PWD IN ${directoryWithNoSize?.fileName}`
//     // )
//     const name = getAllButLastWord(directoryWithNoSize.fileName, ' ')
//     const targetDirectoryIndex = resolveDirectoryIndexMap(directories)[name]
//     count++
//     return findLowestDirectoryUpdateSizeAndReturnItToBeUpdatedElsewhere(
//       directories,
//       targetDirectoryIndex
//     )
//   }
//   const lowestDirectoryFileInFileTree = directories[directoryIndex]

//   const newTotalSize = lowestDirectoryFileInFileTree.files.reduce(
//     (acc, curr) => acc + curr.size,
//     0
//   )
//   const lowestDirectoryWithTotalSize = {
//     ...lowestDirectoryFileInFileTree,
//     totalSize: newTotalSize,
//   }
//   count++
//   // console.log(`LOWEST DIRECTORY`, lowestDirectoryWithTotalSize.directoryName)
//   return lowestDirectoryWithTotalSize
// }

export function resolveDirectoryObject(string: string): Directory[] {
  let resolvedLevel = 0
  const directories = string.split('$ cd')
  const resolvedDirectories: Directory[] = directories
    .map((lines) => {
      const [firstWord, $ls, ...fileNames] = lines.split('\n')
      const directoryName = firstWord?.trim()
      const totalSize = resolveTotalSize(fileNames)
      const files = resolveFileObject(fileNames)

      const level = lines === ' ..\n' ? resolvedLevel-- : resolvedLevel++
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

function resolveLevel(string: string): number {
  return 9
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

function getFirstWord(string: string, splitCondition: string) {
  return string.split(splitCondition)[0]
}

function getAllButLastWord(string: string, splitCondition: string) {
  const [first, ...rest] = string.split(splitCondition)
  return rest.join()
}
