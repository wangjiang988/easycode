const path = require('path')
const { Template } = require('../lib/parser/templateParser')
const Generator = require('../lib/Generator')
const { getFilePath } = require('../lib/common')
const configAction = require('./config')

module.exports = (action, filepath, args) => {
    if (action == 'make') makeTemplate(filepath, args)
    else makeTemplate(filepath, args)
}

/**
 * 制作模板
 * @param {h} filepath 
 */
async function makeTemplate (filepath, args) {

  if (args.f) {
    const rootPath = path.resolve(process.cwd())
    filepath = await getFilePath(args.f, rootPath)
  }
    
  // 获取文件内容
  const template = new Template(filepath, true)
  const generator = new Generator()
  await generator.makeTemplate(template)
  configAction('refresh', 'template')
}

