import { Directory, File } from './types'
import { sum, writeToJson } from './utilities'

let count = 0

export function daySevenPartOne(input: string) {
  const directories = resolveDirectoryObject(input)
  const directoriesSortedByLowestLevels = directories.sort(
    (a, b) => b.level - a.level
  )

  // stops Jest test overwriting the example JSON file
  //  if(!input.includes(`14848514 b.txt`)) writeToJson(directoriesSortedByLowestLevels, `directories.json`)

  const updatedDirectories = updateDirectorySizeLowestLevelsUpwards(
    directoriesSortedByLowestLevels
  )

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

function updateDirectorySizeLowestLevelsUpwards(directories: Directory[]) {
  const highestLevel = directories[0].level
  const levels = Array.from(Array(highestLevel).keys())

  let resolvedDirectories: Directory[] = directories
  // interates per folder level number bottom up

  for (let index = levels.length - 1; index > 0; index--) {
    resolvedDirectories = updateDirectorySizeForBottomLevelOnly(
      resolvedDirectories,
      index + 1
    )
    // updateDirectoryFolderSizes(resolvedDirectories, levels[index] + 1)
  }
  // console.log('DIR', JSON.stringify(resolvedDirectories, undefined, 2))
  return resolvedDirectories
}

function updateDirectoryFolderSizes(
  directories: Directory[],
  folderLevel: number
): Directory[] {
  /*  
1. Resolve object into "easy-to-work-with" format. An object that is an array of directory objects, which has properties but also a file array. This is done by looking at the data with the terminal commands
2. Sort object by highest number level (which is the lowest in the tree)
3. Update sizes of directories in lowest level (because this is guarenteed to not have children that are directories)


4. Update the tree for those directories' sizes folders (that are in the file array)
5. Do step 3 (and 4) with the next level... until top level reached
6. With the object completed, iterate over all directories under 100k
7. Get answer!
*/

  return directories
}

function updateDirectorySizeForBottomLevelOnly(
  directories: Directory[],
  folderLevel: number
): Directory[] {
  return directories.map((directory) => {
    if (directory.level !== folderLevel) return directory

    const totalFilesSize = sum(
      directory.files
        .filter((file) => file.type === 'file')
        .map((file) => file.size as number)
    )

    const totalNestedDirectoriesSize = sum(
      directory.files
        .filter((file) => file.type === 'folder')
        .map((folder) => {
          const resolvedDirectory = directories.find((directory) => {
            // console.log(
            //   'MATCHES',
            //   directory.directoryName,
            //   folder.fileName,
            //   `dir ${directory.directoryName}` === folder.fileName
            // )
            return (
              `dir ${directory.directoryName}` === folder.fileName &&
              directory.level === folderLevel + 1
            )
          }) as Directory
          return resolvedDirectory.totalSize as number
        })
    )
    directory.totalSize = totalNestedDirectoriesSize
    console.log(JSON.stringify(directory, undefined, 2))
    return directory
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
