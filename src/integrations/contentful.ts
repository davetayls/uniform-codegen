import { ComponentDefinitionParameter } from '@uniformdev/canvas'
import { isEmpty } from 'lodash'
import { AllowedContentType } from '../types'
import {
  initWriter,
  pushImport,
  pushWriterLines,
} from '../writer'

export type ContentfulTypeConfig = {
  source: string
  allowedContentTypes: Record<string, AllowedContentType>
}

export function basic(param: ComponentDefinitionParameter) {
  const writer = initWriter([
    `  ${param.id}: ComponentParameter<canvasContentful.EntrySelectorParameterValue>`,
  ])
  pushImport(
    writer,
    '@uniformdev/canvas-contentful',
    'canvasContentful'
  )
  return writer
}

export function enhanced(param: ComponentDefinitionParameter) {
  const writer = initWriter()
  pushImport(writer, './contentful', 'contentfulCodegen')
  const { typeConfig } =
    param as ComponentDefinitionParameter<ContentfulTypeConfig>
  if (!typeConfig || isEmpty(typeConfig?.allowedContentTypes)) {
    return pushWriterLines(writer, [`  ${param.id}: unknown`])
  } else {
    const types = typeConfig.allowedContentTypes
    const typesString = Object.keys(types)
      .map((t) => `contentfulCodegen.I${types[t].name}`)
      .join(' | ')
    return pushWriterLines(writer, [
      `  ${param.id}: ${typesString}`,
    ])
  }
}
