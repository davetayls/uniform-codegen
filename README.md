# uniform-codegen
Unform-codegen generates Typescript types for your Uniform project's components. With this, you speed up the local development of your components.

* [Introduction and Background Video](https://davetayls.me/blog/2022-11-03-uniform-codegen-project)

# Installation

Install `@davetayls/uniform-codegen` in your project using your preferred package manager. i.e.

```shell
npm i -D @davetayls/uniform-codegen

#or

yarn add -D @davetayls/uniform-codegen
```

# Usage
To use the codegen, specify the generation command in the package.json file or use a package runner like npx.

In `package.json`, add a new script command that generates types for your components:

```json
"uniform:codegen": "uniform-codegen components <path-to-components-directory> <full-path-of-output-file>"
```

An example is:

```json
"uniform:codegen": "uniform-codegen components src/uniform/components src/generated/uniform-codegen-components.ts"
```

> Create the folder where the codegen will generate the output file if it doesn't exist.

Next, run the script command:

```shell
# Using npm

npm run uniform:codegen
```

The command above will create a file in the specified directory. The file contains exported types for all components in the specified components directory.
The codegen generates types for all components, empty or not. Where blank type definitions are created for components, you can delete the type or comment it out. 

Alternatively, use npx or yarn to run the codegen without specifying a script command in package.json.

An example using npx is:

```shell
npx uniform-codegen components <path-to-components-directory> <full-path-of-output-file>
```

You can find all available options using the following commands:

```shell
yarn uniform-codegen --help
```

```shell
npx uniform-codegen --help
```

## Mesh Integrations
Uniform Components with Mesh Integrations present non-primitive or unknown types. The codegen can import pre-generated types of the following integrations in the project.

### Big Commerce

Any Big Commerce param maps to the types for Full Product.

### Contentful

The Contentful params expect you to have installed and run the `contentful-typescript-codegen` package with the output going to a file called "contentful-codegen.d.ts" in the same folder. Running the command should be done before running the uniform-codegen command.

```shell
contentful-typescript-codegen --output src/generated/contentful-codegen.d.ts
```

### Hygraph (Graph CMS)

The Contentful params expect you to have run the graphql-codegen on your Hygraph graphql schema. The output should go to a file called "hygraph-codegen.ts" in the same folder.

Here is an example Hygraph project:
https://github.com/hygraph/hygraph-examples/tree/master/with-graphql-codegen
