import { uniq } from 'lodash'

export interface CodeWriterState {
  imports: Map<string, string | string[]>
  lines: string[]
}

export function initWriter(
  lines: string[] = []
): CodeWriterState {
  return {
    imports: new Map<string, string[]>(),
    lines,
  }
}

export function mergeWriters(writers: CodeWriterState[]) {
  const writer = initWriter()
  ;(writer.imports = writers
    .map((w) => w.imports)
    .reduce((map, imp) => {
      for (let k of imp) {
        const existing = map.get(k[0])
        if (existing) {
          if (Array.isArray(k[1]) !== Array.isArray(existing)) {
            throw new Error(
              'You are not able to have both import { X, Y } and import name from the same package at the moment'
            )
          }
          if (Array.isArray(k[1])) {
            map.set(k[0], uniq([...existing, ...k[1]]))
          } else {
            map.set(k[0], k[1])
          }
        } else {
          map.set(k[0], k[1])
        }
      }
      return map
    }, new Map<string, string[]>())),
    (writer.lines = writers.reduce((result, writer) => {
      return [...result, ...writer.lines]
    }, [] as string[]))
  return writer
}

export function renderWriterImportsToString(
  writer: CodeWriterState
) {
  return Array.from(writer.imports.entries())
    .map((entry) =>
      Array.isArray(entry[1])
        ? `import { ${entry[1].join(', ')} } from '${entry[0]}'`
        : `import ${entry[1]} from '${entry[0]}'`
    )
    .join('\n')
}

export function renderWriterToString(
  writer: CodeWriterState
): string {
  return writer.lines.join('\n')
}

export function pushImport(
  writer: CodeWriterState,
  packageName: string,
  properties: string | string[]
) {
  const existing = writer.imports.get(packageName)
  if (existing) {
    if (Array.isArray(properties) !== Array.isArray(existing)) {
      throw new Error(
        'You are not able to have both import { X, Y } and import name from the same package at the moment'
      )
    }
    if (Array.isArray(properties)) {
      writer.imports.set(
        packageName,
        uniq([...existing, ...properties])
      )
    } else {
      writer.imports.set(packageName, properties)
    }
  } else {
    writer.imports.set(packageName, properties)
  }
  return writer
}

export function pushWriterLines(
  writer: CodeWriterState,
  lines: Array<string | [number, string]>
) {
  const newlines: string[] = lines.map((line) =>
    Array.isArray(line)
      ? new Array(line[0] + 1).join('  ') + line[1]
      : line
  )
  writer.lines = [...writer.lines, ...newlines]
  return writer
}

function trimLines(l: string) {
  const lines = l.split('\n').filter(Boolean)
  const spacesMatch = /^(\s*)/.exec(lines[0])
  const spaces = spacesMatch?.[1] ? spacesMatch[1].length : 0
  return lines.map((l) => l.substring(spaces)).join('\n')
}
