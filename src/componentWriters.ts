import { ComponentData } from './types'
import {
  CodeWriterState,
  initWriter,
  mergeWriters,
  pushImport,
  pushWriterLines,
} from './writer'
import { idCase } from './util'
import { parameterLine } from './parameterWriters'
import { slotLine } from './slotWriters'

export function basicComponentWriter({
  id,
  parameters,
  slots,
}: ComponentData): CodeWriterState {
  let writer = initWriter()
  pushImport(writer, '@uniformdev/canvas', [
    'ComponentParameter',
    'ComponentInstance',
  ])
  pushImport(writer, '@uniformdev/canvas-react', [
    'ComponentProps',
  ])
  const componentPrefix = `${idCase(id)}Component`
  pushWriterLines(writer, [
    `export type ${componentPrefix}Fields = {`,
    '  intentTag?: ComponentParameter<IntentTags>',
  ])
  pushWriterLines(writer, ['}'])
  pushWriterLines(writer, [
    `export type ${componentPrefix}EnhancedFields = {`,
    `  intentTag?: ComponentParameter<IntentTags>`,
  ])
  writer = mergeWriters([
    writer,
    ...parameters.map((param) => parameterLine(param, true)),
  ])
  pushWriterLines(writer, ['}'])
  const slotLines = slots
    ?.map(slotLine)
    .map((l): [number, string] => [2, l]) || ['']
  pushWriterLines(writer, [
    `export interface ${componentPrefix}Instance extends ComponentInstance {`,
    `  parameters: ${componentPrefix}Fields`,
    `  slots?: {`,
    ...slotLines,
    `  }`,
    `}`,
  ])
  return writer
}
