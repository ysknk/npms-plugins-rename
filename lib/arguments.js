import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import utils from 'node-package-utilities'

export const packageName = 'rename'
export const packageWrapName = 'npms.config'
export const wrapConfig = await utils.value.fromConfig(packageWrapName)
export const baseConfig = await utils.value.fromConfig(packageName)
export const config = Object.assign(
  {},
  (wrapConfig && wrapConfig[packageName]) || {},
  baseConfig
)

export const argv = yargs(hideBin(process.argv))
  .config(config || {})
  .option('find', {
    alias: 'f',
    describe: 'find files glob',
    default: './**/**.**',
  })
  .option('before', {
    alias: 'b',
    describe: 'rename before',
    default: '',
  })
  .option('after', {
    alias: 'a',
    describe: 'rename after',
    default: '',
  })
  .option('prefix', {
    alias: 'pre',
    describe: 'prefix add filename',
    default: '',
  })
  .option('suffix', {
    alias: 'suff',
    describe: 'suffix add filename',
    default: '',
  })
  .option('ignore', {
    alias: 'ig',
    describe: 'ignore files',
    default: './node_modules/**,**/node_modules/**',
  })
  .option('dryrun', {
    alias: 'd',
    describe: 'dryrun',
    type: 'boolean',
    default: false,
  })
  .option('overwrite', {
    alias: 'ow',
    describe: 'overwrite',
    type: 'boolean',
    default: false,
  })
  .argv

export const find = argv.find
export const before = argv.before
export const after = argv.after
export const prefix = argv.prefix
export const suffix = argv.suffix
export const ignore = argv.ignore
export const dryrun = argv.dryrun
export const overwrite = argv.overwrite

