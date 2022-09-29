import { ParameterWriter } from '../types'
import { initWriter } from '../writer'
import { ComponentDefinitionParameter } from '@uniformdev/canvas'
import { map } from 'lodash'

export type SelectParameter = ComponentDefinitionParameter<{
  options: Array<{ text: string; value: string }>
}>

export const selectParameter: ParameterWriter = ({
  id,
  typeConfig,
}) => {
  const { options } =
    (typeConfig as SelectParameter['typeConfig']) ?? {}
  const optionsTypeUnion = options
    ? map(options, ({ value }) => `'${value}'`).join(' | ')
    : 'string'
  return initWriter([`  ${id}: ${optionsTypeUnion}`])
}
