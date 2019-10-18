#!/usr/bin/env node
const chalk = require('chalk')
const minimist = require('minimist')
const program = require('commander')
const logger = require('../lib/logger')

program
  .usage('<command> [options]')

console.log(chalk.yellow('更多功能请访问：http://www.easycodeforu.com'))

// 这里结束

// program
//   .command('reload git')
//   .description('跟新本地模板项目缓存')
//   // 根据配置文件生成 不用这个参数
//   .action((name, cmd) => {
//     const options = cleanArgs(cmd)
//     const args = minimist(process.argv.slice(3));
//     name = args._
//     require('autoGenCode/lib/reload')(name, options, args)
//   })


/**
 * 初始化配置文件
 * 
 */
program
  .command('config <action> [forWhat]')
  .description('配置文件生成，刷新 config init,  config refresh')
  .action((action, forWhat) => {
    require('../entry/config')(action, forWhat)
  })


/**
 * 根据模板生成文件
 */
program
  .command('make <templateName>')
  .description('generate a new file or group files powered by easycode')
  .action((templateName) => {
    require('../entry/make')(templateName)
  })

/**
 * 路径相关操作
 */
program
.command('path [action] <filename>')
.description('generate a new file or group files powered by easycode')
.action((action, filename) => {
  require('../entry/path')(action, filename)
})

/**
 * 根据模板生成文件
 */
program
.command('template [action] <filepath>')
.description('generate a new file or group files powered by easycode')
.option('-f, --filename', '文件名称(带后缀名)')
.action((action, filepath) => {
  const args = minimist(process.argv.slice(3));
  require('../entry/template')(action, filepath, args)
})



program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`easycode <command> --help`)} for detailed usage of given command.`)
  console.log()
})

const enhanceErrorMessages = require('../lib/util/enhanceErrorMessages')

enhanceErrorMessages('missingArgument', argName => {
  return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`
})

enhanceErrorMessages('unknownOption', optionName => {
  return `Unknown option ${chalk.yellow(optionName)}.`
})

enhanceErrorMessages('optionMissingArgument', (option, flag) => {
  return `Missing required argument for option ${chalk.yellow(option.flags)}` + (
    flag ? `, got ${chalk.yellow(flag)}` : ``
  )
})


program.parse(process.argv)

console.log()

if (!process.argv.slice(2).length) {
  program.outputHelp()
}



function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}


// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}
