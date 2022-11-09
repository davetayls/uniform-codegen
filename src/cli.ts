import { promises as fs } from 'fs'
import { COMPONENTS_ROOT, OUT_FILE } from './types'
import { readComponentsFromDir } from './fs'
import { idCase } from './util'
import { parameterLine } from './parameterWriters'
import { slotLine } from './slotWriters'

export async function run() {
  const writer = []
  writer.push(
    `
import { ComponentParameter, ComponentInstance } from '@uniformdev/canvas'
import { ComponentProps } from '@uniformdev/canvas-react'
import { EntrySelectorParameterValue } from '@uniformdev/canvas-contentful'
import contentfulgen from './contentful'
import bigcommerce from '@uniformdev/canvas-bigcommerce'

`
  )
  const f = await readComponentsFromDir(COMPONENTS_ROOT)
  f.forEach(({ id, parameters, slots }) => {
    const componentPrefix = `${idCase(id)}Component`
    writer.push(`
export type ${componentPrefix}Fields = {
${parameters
  .map((param) => parameterLine(param, false))
  .join('\n')}
}
    `)
    writer.push(`
export type ${componentPrefix}EnhancedFields = {
${parameters
  .map((param) => parameterLine(param, true))
  .join('\n')}
}
    `)
    writer.push(`
export interface ${componentPrefix}Instance extends ComponentInstance {
  parameters: ${componentPrefix}Fields
  slots?: {
    ${slots?.map(slotLine).join('\n') || ''}
  }
}
    `)
    writer.push(`
export type ${componentPrefix} = ComponentProps<${componentPrefix}EnhancedFields>
    `)
  })
  await fs.writeFile(OUT_FILE, writer.join('\n'))
}
