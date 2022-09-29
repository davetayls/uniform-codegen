# uniform-codegen
Code generator utilities including TypeScript types for components for Uniform Projects

# Installation

Install the `@davetayls/uniform-codegen` package using your preferred package manager.

# Usage

The following commands will be available to use via package.json scripts or
with the `yarn` or `npx` commands.

For example:

```shell
yarn uniform-codegen --help
```

```shell
npx uniform-codegen --help
```

## Components

```shell
uniform-codegen components src/uniform/components src/generated/uniform-codegen-components.ts
```

## Integrations

### Big Commerce

Any Big Commerce param maps to the types for Full Product

### Contentful

The Contentful params expect you to have run the `contentful-typescript-codegen`
package with the output going to a file called "contentful-codegen.d.ts" in the
same folder.

```
contentful-typescript-codegen --output src/generated/contentful-codegen.d.ts
```

### Hygraph (Graph CMS)

The Contentful params expect you to have run the graphql-codegen on your
Hygraph graphql schema. The output should go to a file called "hygraph-codegen.ts"
in the same folder.

Here is a Hygraph example project:
https://github.com/hygraph/hygraph-examples/tree/master/with-graphql-codegen
