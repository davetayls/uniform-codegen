import { ParameterWriter } from '../types'
import { initWriter } from '../writer'
import { ComponentDefinitionParameter } from '@uniformdev/canvas'

export type CheckboxParameter =
  ComponentDefinitionParameter<null>

export const checkboxParameter: ParameterWriter = ({ id }) => {
  return initWriter([`  ${id}: boolean`])
}
