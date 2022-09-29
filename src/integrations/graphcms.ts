import { ComponentDefinitionParameter } from '@uniformdev/canvas'
import { isEmpty } from 'lodash'
import { ParameterWriter } from '../types'
import {
  initWriter,
  pushImport,
  pushWriterLines,
} from '../writer'

export type ContentfulTypeConfig = {
  source: string
  allowedModels: Record<
    string,
    { apiId: string; displayName: string }
  >
}

export const basic: ParameterWriter = (
  param: ComponentDefinitionParameter
) => {
  return initWriter([
    `${param.id}: ComponentParameter<EntrySelectorParameterValue>`,
  ])
}

export const enhanced: ParameterWriter = (
  param: ComponentDefinitionParameter
) => {
  const writer = initWriter()
  pushImport(writer, './hygraph-codegen', 'hygraphCodegen')
  const { typeConfig } =
    param as ComponentDefinitionParameter<ContentfulTypeConfig>

  if (!typeConfig || isEmpty(typeConfig?.allowedModels)) {
    return pushWriterLines(writer, [`${param.id}: unknown`])
  } else {
    const modelTypesUnion = Object.keys(typeConfig.allowedModels)
      .map(
        (t) =>
          `hygraphCodegen.${typeConfig.allowedModels[t].apiId}`
      )
      .join(' | ')

    return pushWriterLines(writer, [
      `  ${param.id}: ${modelTypesUnion}`,
    ])
  }
}
