import { ParameterWriter } from '../types'
import { initWriter } from '../writer'
import { ComponentDefinitionParameter } from '@uniformdev/canvas'

export type NumberParameter = ComponentDefinitionParameter<{
  required: boolean
}>

export const basic: ParameterWriter = ({ id, typeConfig }) => {
  const { required } =
    (typeConfig as NumberParameter['typeConfig']) ?? {}
  return initWriter([
    `  ${id}${required ? '?' : ''}: ComponentParameter<string>`,
  ])
}
export const enhanced: ParameterWriter = ({
  id,
  typeConfig,
}) => {
  const { required } =
    (typeConfig as NumberParameter['typeConfig']) ?? {}
  return initWriter([`  ${id}${required ? '?' : ''}: string`])
}
