import { Directory, File } from "./types"
import { sum, writeToJson } from "./helpers"
import { data } from "./data/commands"

export function daySevenPartOne() {
  const directories = resolveDirectoryObject(data)
  const directoriesSortedByLowestLevels = directories.sort(
    (a, b) => b.level - a.level
  )

  const updatedFolderSizes = updateDirectorySizeAndCorrespondingFolderFileSizes(
    directoriesSortedByLowestLevels
  )

  const updatedDirectory = updateDirectoryNewTotalSizes(updatedFolderSizes)
  writeToJson(updatedDirectory, "updated-dir")

  const directoriesLessThan100k = updatedDirectory.filter((directory) => {
    if (directory.totalSize === "unknown")
      throw new Error("total sizes not completely calculated")
    return directory.totalSize <= 100000
  })

  // logObject(updatedDirectory)
  // writeToJson(directoriesLessThan100k, "updated-dir2")

  const total = sum(
    directoriesLessThan100k.map((directory) => directory.totalSize as number)
  )

  return total
}

function updateDirectoryNewTotalSizes(directories: Directory[]): Directory[] {
  directories.map((directory) => {
    const hasUnknownString = directory.files.some(
      (file) => file.size === "unknown"
    )
    if (!!hasUnknownString) throw Error("file size is unknown")
    const total = sum(directory.files.map((file) => file.size as number))
    directory.totalSize = total
  })
  return directories
}

function updateDirectorySizeAndCorrespondingFolderFileSizes(
  directories: Directory[]
): Directory[] {
  const errorMessage = `file sizs should not be "unknown" due to looping from lowest level upwards`
  return directories.map((directory) => {
    // calculates total of directory folder & assigns it to folder
    const fileSizes: number[] = directory.files.map((file) => {
      if (!file || file.size === "unknown") throw Error(errorMessage)
      return file.size
    })
    const folderTotalSize = sum(fileSizes)
    directory.totalSize = folderTotalSize

    // applies size to all folder files of same name
    directories.map((dir) => {
      const matchedFolderFile = dir.files.find(
        (file) => `dir ${directory.directoryName}` === file.fileName
      )
      if (!matchedFolderFile) return dir
      matchedFolderFile.size = folderTotalSize
    })
    return directory
  })
}

export function resolveDirectoryObject(string: string): Directory[] {
  let resolvedLevel = 0
  const directories = string.split("$ cd")
  const resolvedDirectories: Directory[] = directories
    .map((lines) => {
      const [firstWord, $ls, ...fileNames] = lines.split("\n")
      const directoryName = firstWord?.trim()
      const totalSize = resolveTotalSize(fileNames)
      const files = resolveFileObject(fileNames)

      lines === " ..\n" ? resolvedLevel-- : resolvedLevel++

      return {
        directoryName,
        files,
        totalSize,
        level: resolvedLevel,
      }
    })
    .filter((e) => e.directoryName !== "..")
  return resolvedDirectories
}

function resolveFileObject(array: string[]): File[] {
  const files: File[] = array
    .filter((e) => !e.startsWith("$"))
    .filter((e) => e !== "..")
    .filter((e) => e !== "")
    .map((fileInfo) => {
      const [firstWord, ...rest] = fileInfo.split(" ")
      // for filename fileInfo, firstWord is a number for size
      const fileName = fileInfo.startsWith("dir") ? fileInfo : rest.join()
      const size = fileInfo.startsWith("dir") ? "unknown" : parseInt(firstWord)
      const type = fileInfo.startsWith("dir") ? "folder" : "file"
      return {
        fileName,
        size,
        type,
      }
    })
  return files
}

function resolveTotalSize(lines: string[]): number | "unknown" {
  const sizes = lines
    .filter((e) => !e.length)
    .filter((e) => e !== "")
    .filter((e) => e !== "..")
    .map((line) => {
      const [firstWord] = line.split(" ")
      return parseInt(firstWord) ? parseInt(firstWord) : "unknown"
    })
  if (!sizes.length || !sizes) return "unknown"
  if (sizes.some((e) => e === "unknown")) return "unknown"
  return sizes.reduce((acc, curr) => (acc as number) + (curr as number), 0)
}
