import { ParameterWriter } from './types'
import * as contenfulEntry from './codegen/contenfulEntry'
import * as bigcommerceProduct from './codegen/bigcommerceProduct'
import { ComponentDefinitionParameter } from '@uniformdev/canvas'
import { CodeWriterState, initWriter } from './writer'

export const basicParameterTypeMap = new Map<
  string,
  ParameterWriter
>([
  ['text', ({ id }) => initWriter([`  ${id}: string`])],
  ['intentTag', ({ id }) => initWriter([`  ${id}: unknown`])],
  ['contentfulEntry', contenfulEntry.basic],
  ['bigcommerceProduct', bigcommerceProduct.basic],
])

export const enhancedParameterTypeMap = new Map<
  string,
  ParameterWriter
>([
  ['text', ({ id }) => initWriter([`  ${id}: string`])],
  ['intentTag', ({ id }) => initWriter([`  ${id}: unknown`])],
  ['contentfulEntry', contenfulEntry.enhanced],
  ['bigcommerceProduct', bigcommerceProduct.enhanced],
])

export function parameterLine(
  param: ComponentDefinitionParameter,
  enhanced: boolean
): CodeWriterState {
  const parameterGen = enhanced
    ? enhancedParameterTypeMap.get(param.type)
    : basicParameterTypeMap.get(param.type)
  return parameterGen
    ? parameterGen(param)
    : initWriter([`  ${param.id}: unknown`])
}
