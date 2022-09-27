import debug from 'debug'

export const log = debug('uniform-codegen:info')
export const verbose = debug('uniform-codegen:verbose')
export const trace = debug('uniform-codegen:trace')

export function getInfoLogger(name: string) {
  return debug(`uniform-codegen:info:${name}`)
}

export function getVerboseLogger(name: string) {
  return debug(`uniform-codegen:verbose:${name}`)
}

export function enableLogger(verbose?: boolean) {
  if (verbose) {
    debug.enable(
      'uniform-codegen:*,-uniform-codegen:trace*,' +
        process.env.DEBUG
    )
  } else {
    debug.enable(
      'uniform-codegen:*,-uniform-codegen:verbose*,-uniform-codegen:trace*,' +
        process.env.DEBUG
    )
  }
}
