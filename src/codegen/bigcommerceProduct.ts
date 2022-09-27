import { ComponentDefinitionParameter } from '@uniformdev/canvas'
import {
  initWriter,
  pushImport,
  pushWriterLines,
} from '../writer'

export function basic(param: ComponentDefinitionParameter) {
  return initWriter([
    `  ${param.id}: ComponentParameter<number>`,
  ])
}

export function enhanced(param: ComponentDefinitionParameter) {
  const writer = initWriter()
  pushImport(
    writer,
    '@uniformdev/canvas-bigcommerce',
    'bigcommerce'
  )
  return pushWriterLines(writer, [
    `  ${param.id}: bigcommerce.definitions['product_Full']`,
  ])
}
