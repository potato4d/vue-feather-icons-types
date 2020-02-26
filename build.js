const feather = require('feather-icons')
const { pascalCase } = require('pascal-case')
const fs = require('fs-extra')

const base = `import Vue from 'vue';
import { ExtendedVue } from 'vue/types/vue';
export interface FeatherIconProps {
  size: string;
}
export type FeatherIconComponent = ExtendedVue<
  Vue,
  {},
  {},
  {},
  FeatherIconProps
  >;
`

const dtsTemplate = (name) => `export declare const ${name}: FeatherIconComponent;`

const handleComponentName = name => name.replace(/\-(\d+)/, '$1')

const icons = Object.keys(feather.icons).map(name => ({
  name,
  pascalCasedComponentName: pascalCase(`${handleComponentName(name)}-icon`)
}))

const main = base +
  icons
  .map((icon) => dtsTemplate(icon.pascalCasedComponentName))
  .join('\n')
fs.outputFile('./src/index.d.ts', main, 'utf8')
