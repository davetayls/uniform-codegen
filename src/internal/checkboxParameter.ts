import { ParameterWriter } from '../types'
import { initWriter } from '../writer'
import { ComponentDefinitionParameter } from '@uniformdev/canvas'

export type CheckboxParameter =
  ComponentDefinitionParameter<null>

export const basic: ParameterWriter = ({ id }) => {
  return initWriter([`  ${id}: ComponentParameter<boolean>`])
}

export const enhanced: ParameterWriter = ({ id }) => {
  return initWriter([`  ${id}: boolean`])
}
