import { ComponentDefinitionSlot } from '@uniformdev/canvas'

export function slotLine(slot: ComponentDefinitionSlot) {
  return `  ${slot.id}: ComponentInstance[]`
}
