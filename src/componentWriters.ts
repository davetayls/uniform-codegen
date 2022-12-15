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
  pushImport(imports, '@uniformdev/canvas-react', [
    'ComponentProps',
  ])
  const componentPrefix = `${idCase(data.id)}Component`
  return mergeWriters([
    imports,
    writeComponentVariantsType(componentPrefix, data),
    writeComponentFieldsType(componentPrefix, data),
    writeComponentEnhancedType(componentPrefix, data),
    writeComponentPropsType(componentPrefix, data),
    writeComponentInstanceType(componentPrefix, data),
  ])
}

function writeComponentVariantsType(
  componentPrefix: string,
  { variants }: ComponentData
): CodeWriterState {
  let writer = initWriter()
  if (variants) {
    const variantTypeName = (id: string) =>
      `${componentPrefix}Variant${idCase(id)}`
    pushLines(
      writer,
      variants.map(
        ({ id }) =>
          `export type ${variantTypeName(id)} = '${id}'`
      )
    )
    pushLines(writer, [
      `export type ${componentPrefix}Variants = `,
    ])
    pushLines(writer, [
      variants.map(({ id }) => variantTypeName(id)).join(' | '),
    ])
  }
  return writer
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

function writeComponentPropsType(
  componentPrefix: string,
  data: ComponentData
): CodeWriterState {
  let writer = initWriter()
  pushLines(writer, [
    `export type ${componentPrefix}Props = ComponentProps<${componentPrefix}EnhancedFields>`,
  ])
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
