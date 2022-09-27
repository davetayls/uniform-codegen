import { startCase } from 'lodash'

export const idCase = (s: string) =>
  startCase(s).replace(/\s/g, '')
