import { ParameterWriter } from './types'
import * as contentful from './integrations/contentful'
import * as bigcommerce from './integrations/bigcommerce'
import * as graphcms from './integrations/graphcms'
import { ComponentDefinitionParameter } from '@uniformdev/canvas'
import { CodeWriterState } from './writer'
import * as unknownParameter from './internal/unknownParameter'
import * as selectParameter from './internal/selectParameter'
import * as textParameter from './internal/textParameter'
import * as numberParameter from './internal/numberParameter'
import * as checkboxParameter from './internal/checkboxParameter'
import * as projectmapLinkParameter from './internal/projectmapLinkParameter'

export const basicParameterTypeMap = new Map<
  string,
  ParameterWriter
>([
  // internal
  ['text', textParameter.basic],
  ['number', numberParameter.basic],
  ['checkbox', checkboxParameter.basic],
  ['select', selectParameter.basic],
  ['sitemap_link', projectmapLinkParameter.basic],
  ['project_map_link', projectmapLinkParameter.basic],
  ['intentTag', unknownParameter.basic],
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
  ['sitemap_link', projectmapLinkParameter.enhanced],
  ['project_map_link', projectmapLinkParameter.enhanced],
  ['intentTag', unknownParameter.enhanced],
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
    ? enhancedParameterTypeMap.get(param.type) ||
      unknownParameter.enhanced
    : basicParameterTypeMap.get(param.type) ||
      unknownParameter.basic
  return parameterGen(param)
}
