import { promises as fs } from 'fs'
import { log } from './log'
import { promisify } from 'util'
import gob from 'glob'
import { ComponentData } from './types'
import { load } from 'js-yaml'
import { join } from 'path'

export const glob = promisify(gob)

export async function readJSON(path: string) {
  try {
    const json = await fs.readFile(path, 'utf8')
    return JSON.parse(json)
  } catch (error) {
    throw new Error(`Error parsing ${path}`)
  }
}

export async function writeOver(path: string, data: string) {
  await fs.writeFile(path, data)
}

export async function writeInto(path: string, data: string) {
  let fileString = ''
  try {
    fileString = await fs.readFile(path, 'utf8')
  } catch {
    fileString = ''
  }
  if (fileString.includes('//## SCHEMAS:START')) {
    log('Found existing schemas')
    const r =
      /(?<=\/\/## SCHEMAS:START\n)([\s\S]*)(?=\/\/## SCHEMAS:END)/
    fileString = fileString.replace(r, data)
  } else {
    fileString += `
    
//## SCHEMAS:START
${data}
//## SCHEMAS:END`
  }
  await fs.writeFile(path, fileString)
}

async function readFileToObject(
  filename: string
): Promise<ComponentData> {
  const file = await fs.readFile(filename, 'utf8')
  return load(file, { filename, json: true }) as ComponentData
}

export async function readComponentsFromDir(dirPath: string) {
  const files = await fs.readdir(dirPath)
  return await Promise.all(
    files.map((fileName) =>
      readFileToObject(join(dirPath, fileName))
    )
  )
}
