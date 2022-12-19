import fs from 'fs'
import path from 'path'

export function writeToJson(data: unknown, fileName: string) {
  let json = JSON.stringify(data, undefined, 2)
  fs.writeFileSync(path.join(`src/jsonFromFS`, fileName), json, 'utf8')
}
