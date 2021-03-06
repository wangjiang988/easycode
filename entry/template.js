const path = require('path')
const chalk = require('chalk')
const { Template } = require('../lib/parser/templateParser')
const Generator = require('../lib/Generator')
const { getFilePath } = require('../lib/common')
const configAction = require('./config')

// easy template pull 
module.exports = (action, filepath, args) => {
  if(args.f) {
    action = args._
  }
  if (action == 'make') makeTemplate(filepath, args)
  else if (action == 'pull') pullGit(filepath, args)
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

  console.log(chalk.blue('待复制文件路径为:', filepath))
    
  // 获取文件内容
  const easycode = new EasyCode(true)
  easycode.init()
  const template = new Template(filepath, easycode)
  const generator = new Generator()
  await generator.makeTemplate(template)
  configAction('refresh', 'template')
}

