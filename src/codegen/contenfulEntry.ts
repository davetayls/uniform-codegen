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
  return initWriter([
    `  ${param.id}: ComponentParameter<EntrySelectorParameterValue>`,
  ])
}

export function enhanced(param: ComponentDefinitionParameter) {
  const writer = initWriter()
  pushImport(writer, './contentful', 'contentfulgen')
  const { typeConfig } =
    param as ComponentDefinitionParameter<ContentfulTypeConfig>
  if (!typeConfig || isEmpty(typeConfig?.allowedContentTypes)) {
    return pushWriterLines(writer, [`  ${param.id}: unknown`])
  } else {
    const types = typeConfig.allowedContentTypes
    const typesString = Object.keys(types)
      .map((t) => `contentfulgen.I${types[t].name}`)
      .join(' | ')
    return pushWriterLines(writer, [
      `  ${param.id}: ${typesString}`,
    ])
  }
}
