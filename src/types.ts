import {
  ComponentDefinitionParameter,
  ComponentDefinitionSlot,
  ComponentDefinitionVariant,
} from '@uniformdev/canvas'
import { CodeWriterState } from './writer'

export const COMPONENTS_ROOT = 'uniform/components'
export const OUT_FILE = '@types/generated/uniform.d.ts'

export type ComponentData = {
  id: string
  parameters: ComponentDefinitionParameter[]
  slots?: ComponentDefinitionSlot[]
  variants?: ComponentDefinitionVariant[]
}
export type ParameterWriter = (
  param: ComponentDefinitionParameter
) => CodeWriterState

export type AllowedContentType = { id: string; name: string }
