/**
 * 模板描述和变量解析器
 */
const fileUtil = require('../util/fileUtil')
const StringUtils = require('../util/stringUtils')
const path = require('path')
const TemplatesPath = './templates'
const logger = require('../logger')
const { JavaFieldParser } = require('./javaFieldParser');
const Handlebars = require('handlebars');


/**
 * 模板文件对象
 * filePath 模板文件绝对路径
 * targetPath 目标文件生成路径
 * content 字符串
 * variables 变量数组
 */
class Template {

  constructor(fileName, easycode) {
    this.setProjectRoot()
    // 文件名, 带有相对于模板目录的相对路径
    this.fileName = StringUtils.getFileName(fileName)
    // 相对于模板目录的路径名+文件名
    this.positiveTempateRootFileName = fileName
    // 文件模板根路径
    this.templateRootPath = path.resolve(this.projectRootPath, TemplatesPath)
    
    this.filePath = path.resolve(this.projectRootPath, fileName)

    if (!fileUtil.checkFileOrPathExist(this.filePath)) {
      this.filePath = path.join(this.templateRootPath, fileName)
    }

    if (!fileUtil.checkFileOrPathExist(this.filePath)) {
      logger.fatal("文件或路径不存在:", this.filePath)
      process.exit()
    }

    this.content = this.getContent()
    this.globalVaris = {}
    this.easycode = easycode
  }

  setGlobalVaris(varis) {
    this.globalVaris = varis
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
      // console.log('variableArr', variableArr)
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
    const easycodeVariable = Object.assign(this.easycode.rootVariables,
                        {metadata: this.easycode.metadata})
    const rootVariables = {root: easycodeVariable}
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
    // 字段描述，java语言解析表结构
    else if (key === '@javaFieldParser') {
      // value 其实是表名
      this.table_name = parseVaris(this.globalVaris, value)
      const parser = new JavaFieldParser(this.globalVaris.group.mysql)
      this.javaFieldParser = parser
      // parser.parseFieldToEntity(table_name,(ret) => {
      //   this.easycode.rootVariables.group.table_fields = ret
      // })
      return ''
    }
    // 生成路径
    else if (key === '@targetPath') {
      // 这里需要获取全局路径变量
      const template = Handlebars.compile(value)
      this.targetPath = template(rootVariables)

      console.log(rootVariables)
      console.log(this.targetPath)
      // this.targetPath = path.join(this.projectRootPath, value.replace('@projectRoot', '.'));
      // this.targetPath = parseVaris(this.globalVaris, this.targetPath)
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
        default: parseVaris(this.globalVaris, variableArr[1]),
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

  static async AsyncParse(filePath, variables, easycode) {
    const template = new Template(filePath, easycode)
    template.setGlobalVaris(variables)
    await template.AsyncParse()
    return template
  }
}

module.exports = { 
  TemplateParser,
  Template
}

/**
 * 从某个对象集中替换字符
 * @param {*} variables 
 * @param {*} vari 
 */
function parseVaris(variables, vari) {
  var exp = /\<\{(\S+)\}\>/;
  while (result = exp.exec(vari)) {
    if (result[0]) {
      vari = vari.replace(result[0], getDataFromObject(variables, result[1]));
    }
  }
  return vari
}

/**
 * 
 * @param {*} obj 
 * @param {root.group.model} pointIndex 
 */
function getDataFromObject (obj, pointIndex) {
  pointIndex = pointIndex.replace('root.', '')
  const array = pointIndex.split('.')
  let targetObj = obj
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    targetObj = targetObj[element]
    if (typeof targetObj == 'string' 
          && (index == array.length-1)) {
            return targetObj
          } 
    else if (targetObj instanceof Object) {
      continue
    } 
    else return ''
  }
}

