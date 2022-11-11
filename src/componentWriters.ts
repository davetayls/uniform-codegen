import { ComponentData } from './types'
import {
  CodeWriterState,
  initWriter,
  mergeWriters,
  pushImport,
  pushLines,
} from './writer'
import { idCase } from './util'
import { parameterLine } from './parameterWriters'
import { slotLine } from './slotWriters'

export function basicComponentWriter(
  data: ComponentData
): CodeWriterState {
  let imports = initWriter()
  pushImport(imports, '@uniformdev/canvas', [
    'ComponentParameter',
    'ComponentInstance',
  ])
  const componentPrefix = `${idCase(data.id)}Component`
  return mergeWriters([
    imports,
    writeComponentFieldsType(componentPrefix, data),
    writeComponentEnhancedType(componentPrefix, data),
    writeComponentInstanceType(componentPrefix, data),
  ])
}

function writeComponentFieldsType(
  componentPrefix: string,
  { parameters }: ComponentData
): CodeWriterState {
  let writer = initWriter()
  pushLines(writer, [`export type ${componentPrefix}Fields = {`])
  writer = mergeWriters([
    writer,
    ...parameters.map((param) => parameterLine(param, false)),
  ])
  pushLines(writer, ['}'])
  return writer
}

function writeComponentEnhancedType(
  componentPrefix: string,
  { parameters }: ComponentData
): CodeWriterState {
  let writer = initWriter()
  pushLines(writer, [
    `export type ${componentPrefix}EnhancedFields = {`,
  ])
  writer = mergeWriters([
    writer,
    ...parameters.map((param) => parameterLine(param, true)),
  ])
  pushLines(writer, ['}'])
  return writer
}

function writeComponentInstanceType(
  componentPrefix: string,
  { slots }: ComponentData
): CodeWriterState {
  let instanceType = initWriter()
  pushLines(instanceType, [
    `export interface ${componentPrefix}Instance extends ComponentInstance {`,
    `  parameters: ${componentPrefix}Fields`,
  ])
  if (slots && slots.length > 0) {
    const slotLines = slots
      ?.map(slotLine)
      .map((l): [number, string] => [2, l]) || ['']
    pushLines(instanceType, [`  slots?: {`, ...slotLines, `  }`])
  }
  pushLines(instanceType, [`}`])
  return instanceType
}
