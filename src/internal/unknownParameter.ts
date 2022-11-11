import { ParameterWriter } from '../types'
import { initWriter } from '../writer'
import { ComponentDefinitionParameter } from '@uniformdev/canvas'

export type UnknownParameter = ComponentDefinitionParameter<{
  required: boolean
}>

export const basic: ParameterWriter = ({ id, typeConfig }) => {
  const { required } =
    (typeConfig as UnknownParameter['typeConfig']) ?? {}

  return initWriter([
    `  ${id}${required ? '?' : ''}: ComponentParameter<unknown>`,
  ])
}

export const enhanced: ParameterWriter = ({
  id,
  typeConfig,
}) => {
  const { required } =
    (typeConfig as UnknownParameter['typeConfig']) ?? {}
  return initWriter([`  ${id}${required ? '?' : ''}: unknown`])
}
