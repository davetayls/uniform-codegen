import { ParameterWriter } from './types'
import * as contentful from './integrations/contentful'
import * as bigcommerce from './integrations/bigcommerce'
import * as graphcms from './integrations/graphcms'
import { ComponentDefinitionParameter } from '@uniformdev/canvas'
import { CodeWriterState, initWriter } from './writer'
import * as selectParameter from './internal/selectParameter'
import * as textParameter from './internal/textParameter'
import * as numberParameter from './internal/numberParameter'
import * as checkboxParameter from './internal/checkboxParameter'

export const basicParameterTypeMap = new Map<
  string,
  ParameterWriter
>([
  // internal
  ['text', textParameter.basic],
  ['number', numberParameter.basic],
  ['checkbox', checkboxParameter.basic],
  ['select', selectParameter.basic],
  ['intentTag', ({ id }) => initWriter([`  ${id}: unknown`])],
  // integrations (ideally these should be loaded from external packages)
  ['bigcommerceProduct', bigcommerce.basic],
  ['contentfulEntry', contentful.basic],
  ['graphcms-entry', graphcms.basic],
])

export const enhancedParameterTypeMap = new Map<
  string,
  ParameterWriter
>([
  // internal
  ['text', textParameter.enhanced],
  ['number', numberParameter.enhanced],
  ['checkbox', checkboxParameter.enhanced],
  ['select', selectParameter.enhanced],
  ['intentTag', ({ id }) => initWriter([`  ${id}: unknown`])],
  // integrations (ideally these should be loaded from external packages)
  ['bigcommerceProduct', bigcommerce.enhanced],
  ['contentfulEntry', contentful.enhanced],
  ['graphcms-entry', graphcms.enhanced],
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
