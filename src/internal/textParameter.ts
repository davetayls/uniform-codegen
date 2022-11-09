import { ParameterWriter } from '../types'
import { initWriter } from '../writer'
import { ComponentDefinitionParameter } from '@uniformdev/canvas'

export type TextParameter = ComponentDefinitionParameter<{
  required: boolean
}>

export const basic: ParameterWriter = ({ id, typeConfig }) => {
  const { required } =
    (typeConfig as TextParameter['typeConfig']) ?? {}
  return initWriter([
    `  ${id}${required ? '?' : ''}: ComponentParameter<string>`,
  ])
}

export const enhanced: ParameterWriter = ({
  id,
  typeConfig,
}) => {
  const { required } =
    (typeConfig as TextParameter['typeConfig']) ?? {}
  return initWriter([`  ${id}${required ? '?' : ''}: string`])
}
