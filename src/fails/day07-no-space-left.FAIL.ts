/*

import { commands } from './consts'
import { Command, Directory, File } from './types'

export function daySevenPartOne() {
  const resolvedCommands = resolveCommands(commands)
  const resolvedCurrentDirectoryReference =
    resolveCurrentDirectoryReference(resolvedCommands)
  return resolveFileTree(resolvedCommands, resolvedCurrentDirectoryReference)
}

export function resolveFileTree(
  commands: Command[],
  dirReference: Directory[]
) {
  const arrayOfLS = commands
    .map((element) => {
      if (element.command === 'ls') return element
    })
    .filter((e) => e !== undefined)
  console.log({ arrayOfLS })

  const updatedDirectories = arrayOfLS.map((element) => {
    return element?.dir?.map((element) => {
      if (element.type !== 'dir') return element
      const resolvedName = getAllButLastWord(element.name, ' ')
      return dirReference
        .map((ref) => {
          if (resolvedName === ref.name) {
            return { ...element, level: ref.level }
          }
        })
        .filter((e) => e !== undefined)
    })
  })

  console.log(updatedDirectories.map((e) => console.log(e)))
  return {}
}

export function resolveCurrentDirectoryReference(commands: Command[]) {
  let history: string[] = []
  let currentLevel = 0

  const resolvedCurrentDirectoryReference = commands.map((element) => {
    const directoryName = resolveDirectoryName(element.command, history)
    if (!directoryName) return null
    history.push(directoryName)

    // Resolve directory nesting level
    if (element.command === `cd ..`) currentLevel--
    if (element.command.includes(`cd`) && element.command !== `$ cd ..`)
      currentLevel++

    return {
      name: directoryName,
      level: currentLevel,
    }
  })

  const currentDirectoryReference = resolvedCurrentDirectoryReference.filter(
    (element) => element !== null
  ) as Directory[]
  return currentDirectoryReference
}

export function resolveDirectoryName(command: string, history: string[]) {
  const isTopLevel = history.at(0) === history.at(-1)
  const [firstWord, secondWord] = command.split(` `)
  if (command === `ls`) return
  if (firstWord !== `cd`) return
  if (secondWord === `..` && isTopLevel) {
    console.warn(`cannot go a level higher in directory`)
    return
  }
  if (secondWord === `..` && !isTopLevel) {
    return history.at(-2) as string
  }
  return getAllButLastWord(command, ' ')
}

// Reorganise data to include an array for ls command list of files
function resolveCommands(commands: string) {
  const arrayByDollar = commands.split(`$ `)
  // First element is empty for some reason
  const resolvedArrayByDoller = arrayByDollar.filter((_, index) => index !== 0)
  const commandsWithListings = resolvedArrayByDoller.map((lines) => {
    const command = getFirstWord(lines, `\n`)
    return getFirstWord(lines, `\n`) === `ls`
      ? {
          command,
          dir: createFilesArray(lines),
        }
      : { command }
  })
  return commandsWithListings
}

export function createFilesArray(lines: string) {
  const groupedFiles = lines.split('\n')
  const trimmedGroupFiles = groupedFiles.filter(
    (fileInfo, index) => index !== 0 && index !== groupedFiles.length - 1
  )
  const files: File[] = trimmedGroupFiles.map((file) => {
    const [fileData] = file.split(`\n`)
    const [resolvedSize, fileName] = fileData.split(` `)
    const hasFileType = fileName.includes('.')

    const name = resolveFileName(fileData, fileName, hasFileType)
    const type = resolveFileType(fileData, fileName, hasFileType)
    const size = parseInt(resolvedSize) | 0
    return { name, type, size }
  })
  return files
}

function resolveFileType(
  fileData: string,
  fileName: string,
  hasFileType: boolean
) {
  if (!!hasFileType) return fileName.split(`.`)[1]
  if (fileData.includes('dir')) return 'dir'
  return ''
}

function resolveFileName(
  fileData: string,
  fileName: string,
  hasFileType: boolean
) {
  if (fileData.includes('dir')) return fileData
  if (hasFileType) return fileName.split(`.`)[0]
  return fileName
}

function getFirstWord(string: string, splitCondition: string) {
  return string.split(splitCondition)[0]
}

function getAllButLastWord(string: string, splitCondition: string) {
  const arrayOfStrings = string.split(splitCondition)
  const rest = arrayOfStrings.slice(1, arrayOfStrings.length).join(' ')
  return rest
}

*/
