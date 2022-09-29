import { ParameterWriter } from '../types'
import { initWriter } from '../writer'
import { ComponentDefinitionParameter } from '@uniformdev/canvas'

export type NumberParameter = ComponentDefinitionParameter<{
  required: boolean
}>

export const numberParameter: ParameterWriter = ({
  id,
  typeConfig,
}) => {
  const { required } =
    (typeConfig as NumberParameter['typeConfig']) ?? {}
  return initWriter([`  ${id}${required ? '?' : ''}: string`])
}
