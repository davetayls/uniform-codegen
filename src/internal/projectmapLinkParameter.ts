import { ParameterWriter } from '../types'
import { initWriter } from '../writer'

export const basic: ParameterWriter = ({ id }) => {
  return initWriter([`  ${id}?: ComponentParameter<string>`])
}

export const enhanced: ParameterWriter = ({ id }) => {
  return initWriter([`  ${id}?: string`])
}
