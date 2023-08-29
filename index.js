#!/usr/bin/env node

'use strict'

/* @author ysknk */

import { promises as fs } from 'fs'
import { constants } from 'fs'
import glob from 'glob'
import path from 'path'

import utils from 'node-package-utilities'

import argv from './lib/arguments.js'

let options = argv

const globOptions = {
  ignore: argv.ignore
}

const onSequence = (file) => {
  return (options.onSequence && options.onSequence(file)) || file
}

const isAccess = async (dir) => {
  let result = false
  try {
    await fs.access(dir, constants.R_OK | constants.W_OK)
    result = true
  } catch (err) {
    // utils.message.failure(err)
  }
  return result
}

const onRename = async (file) => {
  let result = onSequence(file)

  const basename = path.basename(result)
  const dirname = result.replace(basename, '')

  const access = await isAccess(dirname)
  if (!access) {
    await fs.mkdir(dirname, { recursive: true }, (err) => {
      utils.message.failure(err)
    })
  }

  if (options.before) {
    result = result.replace(options.before, options.after)
  }
  if (options.prefix || options.suffix) {
    const parsepath = path.parse(result)
    const name = `${options.prefix}${parsepath.name}${options.suffix}`
    result = `${result.replace(parsepath.base, name)}${parsepath.ext}`
  }
  return result
}

utils.message.begin()

glob(options.find, globOptions, (err, files) => {
  if (err) {
    console.log(err)
    return
  }

  ;(async () => {
    for await (const file of files) {
      const filepath = path.resolve(file)
      utils.message.processing(filepath)

      // NOTE: fileconfig
      const ext = path.extname(file)
      const fileconfig = utils.value.fromPath(file, ext, argv.config) || {}
      options = Object.assign({}, options.config, fileconfig)

      const renamepath = await onRename(filepath)

      const checkRenamedPath = await isAccess(renamepath)
      if (!options.overwrite && checkRenamedPath) {
        utils.message.failure(`can't overwite ${renamepath}`)
        continue
      }

      if (options.dryrun) {
        utils.message.success(utils.color.colors.brightGreen('[dryrun]') + ` ${renamepath}`)
      } else {
        // NOTE: rename
        await fs.rename(filepath, renamepath, (err) => {
          utils.message.failure(err)
        })
        utils.message.success(`${renamepath}`)
      }
    }
    utils.message.finish()
  })()
})
