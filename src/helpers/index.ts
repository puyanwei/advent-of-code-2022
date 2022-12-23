import fs from 'fs'
import path from 'path'

export function writeToJson(data: unknown, fileName: string) {
  let json = JSON.stringify(data, undefined, 2)
  fs.writeFileSync(path.join(`src/json`, `${fileName}.json`), json, 'utf8')
}

export function sum(array: number[]): number {
  return array.reduce((prev, current) => (prev += current), 0)
}

export function logObject(object: unknown) {
  console.warn(JSON.stringify(object, undefined, 2))
}
