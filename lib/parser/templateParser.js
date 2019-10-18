/**
 * 模板描述和变量解析器
 */
const fileUtil = require('../util/fileUtil')
const StringUtils = require('../util/stringUtils')

const path = require('path')
const TemplatesPath = './templates'
const logger = require('../logger')


/**
 * 模板文件对象
 * filePath 模板文件绝对路径
 * targetPath 目标文件生成路径
 * content 字符串
 * variables 变量数组
 */
class Template {
  // isAbsolutePath  filePath 是否绝对路径
  // 默认是相对于模板路径
  constructor(fileName, isAbsolutePath) {
    if (!fileUtil.checkFileOrPathExist(fileName)) {
      logger.fatal("文件或路径不存在")
      process.exit()
    }
    this.setProjectRoot()
    // 文件名, 带有相对于模板目录的相对路径
    this.fileName = StringUtils.getFileName(fileName)
    // 相对于模板目录的路径名+文件名
    this.positiveTempateRootFileName = fileName
    // 文件模板根路径
    this.templateRootPath = path.resolve(this.projectRootPath, TemplatesPath)
    
    if(!isAbsolutePath) {
      this.filePath = path.join(this.templateRootPath, fileName)
    } else {
      this.filePath = path.resolve(this.projectRootPath, fileName)
    }

    this.content = this.getContent()
  }

  setProjectRoot () {
    this.projectRootPath = path.resolve(process.cwd())
  }

  // 获取文件
  getContent() {
    try {
      const content = fileUtil.readFile(this.filePath)
      return content
    } catch (error) {
      // logger.fatal(error)
      console.error(error)
    }
  }

  // 解析模板文件参数
  // callback 回调方法
  parse(callback) {
    fileUtil.readFileToArr(this.filePath, (arr) => {
      // 解析@符号对应的变量
      const lineNumber = arr.length
      // 存放描述的变量数组
      const variableArr = []
      // 记录flag
      let recording = false
      let recordFinished = false
      for (let i = 0; i < lineNumber; i++) {
        const line = arr[i]
        if (line === '/**') {
          // 从这里开始记录，只记录一次
          recording = true
          continue
        }
        // 记录结束
        if (line === '*/') {
          recording = false
          recordFinished = true
        }
        // 记录
        if (recording) {
          // 解析注释line
          const ret = this.doParseNoteLine(line)
          if (StringUtils.isNotEmpty(ret)) variableArr.push(ret)
        }
        // 跳出记录
        if (recordFinished) break;
      }
      this.variables = variableArr;
      // 回调
      if(callback instanceof Function) callback(this)
    })
  }

  // 解析之后promise 返回
  async AsyncParse() {
    return new Promise((res, rej) => {
      this.parse(res)
    })
  }

  /**
   * 解析注释
   * @param {} line 
   */
  doParseNoteLine(line) {
    // 先去掉开头的*
    if (StringUtils.startsWith(line, '*'))
      line = StringUtils.trim(line.substr(1))
    // 将多个空格变一个空格
    line = StringUtils.oneSpace(line)
    // keyvalue
    const lineArr = line.split(" ")
    const key = lineArr[0]
    const value = lineArr[1]
    // @开头标示为模板变量 否则返回空，不做处理
    if (!StringUtils.startsWith(key, '@')) {
      return ''
    }
    // 模板名称
    if (key === '@name') {
      this.name = value
      return ''
    }
    if (key === '@ext') {
      this.ext = value
      return ''
    }
    // 模板描述
    else if (key === '@description') {
      this.description = value
      return ''
    }
    // 生成路径
    else if (key === '@targetPath') {
      // TODO 这里应该处理为，加上全局变量的解析
      this.targetPath = path.join(this.projectRootPath, value.replace('@projectRoot', '.'));
      return ''
    }
    // 变量
    else if (key === '@variable') {
      // 解析变量
      const variableArr = value.split('|')
      if (variableArr.length != 3) {
        console.error('变量错误， 格式应为: {name}|{default}|{description}')
        process.exit()
      }
      return {
        name: variableArr[0],
        default: variableArr[1],
        description: variableArr[2]
      }
    }
  }
}

/**
 * 同步解析
 */
// async function test () {
//   const template = new Template('demo_single_template.js')
//   await template.parsePromise()
//   console.log(template)
// }
// test()

/**
 * 异步解析
 */
// const template = new Template('demo_single_template.js')
// template.parse(t => {
//   console.log(t)
// })

class TemplateParser {
  // 解析出模板对象
  static parse(filePath, callback) {
    const template = new Template(filePath)
    template.parse(t => {
      callback(t)
    })
  }

  static async AsyncParse(filePath) {
    const template = new Template(filePath)
    await template.AsyncParse()
    return template
  }
}

module.exports = { 
  TemplateParser,
  Template
}
