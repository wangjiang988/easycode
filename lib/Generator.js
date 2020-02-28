/**
 * 模板文件生成器
 * tempate Tempate 对象
 * templateType 模板类型
 */
const path = require('path')
const fs = require('fs')
const MetalSmith = require('metalsmith')
const delimiters = require('handlebars-delimiters');
const Handlebars = require('handlebars');
const renamer = require("metalsmith-renamer")
const StringUtils = require("./util/stringUtils")
const FileUtils = require("./util/fileUtil")
const justSingleFile = require("./metalsmith/metalsmithSingleFile")
const { ask, askAQuestion, muilpulAsk } = require('./ask')
const { getProjectPositivePath, getProjectAbosutePath } = require('./common')
const Note = require('../lib/Note')
const { renderTemplateFiles } = require('./metalsmith/metalsmithPlugin')
const logger = require('./logger')

// 重新定义标示符号，避免跟vue的模板渲染冲突
delimiters(Handlebars, ['<{', '}>']);

module.exports = class Generator {
  constructor(template) {
    if(template) {
      this.init(template)
    }
  }

  /**
   * 将easycode对象存入，这样可以使用easycode里边的属性
   */
  setEasyCode(easycode) {
    this.easycode = easycode
  }

  getGlobalVariablesFromEasycode() {
    let variables = {}
    if (this.easycode !== null) {
      variables = {
        ...this.easycode.rootVariables,
        ...this.easycode.metadata
      }
    }
    return variables
  }

  init(template, easycode) {
    this.template = template
    if (template instanceof Array) {
      this.template_type = 'group'
    } else {
      this.template_type = 'single'
    }
    this.easycode = easycode
}

  /**
   * 生成目标文件
   */
  generate() {
    if (this.template_type === 'single') {
      this.generateSingle()
    }
  }

  async generateSingle() {
     // 从easycode对象中获取全局变量
    const globalVaris = this.getGlobalVariablesFromEasycode()
    // 根据变量 解析字符串
    this.template.name = parseVaris(globalVaris, this.template.name)

    const metalsmith = MetalSmith(this.template.templateRootPath)
    // 单文件询问生成文件名称
    const targetFileNameAns = await ask([{
      name: 'targetFileName',
      message: '待生成文件名称',
      default: this.template.name
    }])

    let metadata = await ask(this.template.variables)
    if (typeof this.template.javaFieldParser != 'undefined') {
      const table_fields = await this.template.javaFieldParser.parseFieldToEntity(this.template.table_name)
      Object.assign(globalVaris.group, { table_fields: table_fields})
    }
    // console.log('globalVaris', globalVaris)

    metadata.targetFileName = targetFileNameAns.targetFileName + '.' + this.template.ext

    Object.assign(metalsmith.metadata(), metadata, { root: globalVaris})
    // console.log(metalsmith.metadata())

    // 询问文件生成路径
    const defaultPositiveTargetPath = getProjectPositivePath(this.template.targetPath)

    let targetPath = await askAQuestion('文件生成地址:(相对于当前路径)', defaultPositiveTargetPath)

    targetPath = getProjectAbosutePath(targetPath)

    let metalsmithTmp = metalsmith.use(renderTemplateFiles(metadata))


    // 解决文件名称不变导致的文件不能生成问题
    // 解决含有
    if (this.template.fileName != metadata.targetFileName) {
      metalsmithTmp = metalsmithTmp.use(renamer({
        single: {
          pattern: this.template.positiveTempateRootFileName,
          rename: metadata.targetFileName
        }
      })
      )
    }

    // 生成文件
    metalsmithTmp
      .use(justSingleFile(metadata.targetFileName))
      .clean(false)
      .source('.')
      .destination(targetPath)
      .build(function (err, files) {
        if (err) console.log(err)
      })
  }

  /**
   * 跟模板无关，就是生成一个文件夹到当前目录下
   * 
   * @file 
   * file.dir, 相对于项目路径的相对路径,带文件名
   * file.filename 文件名
   */
  simpleCopyPath(targetPath, destination) {
    const metalsmith = MetalSmith(targetPath)
    metalsmith
      .source('.')
      .destination(destination)
      .clean(false)
      .build(function(err, files) {
        if (err) console.log(err)
      })
  }

  /**
   * 制作模板
   * template  Template 对象
   */
  async makeTemplate(template) {
    // 模板存放路径
    let targetPath = await askAQuestion('生成地址:(相对于./templates下)', '')

    // 模板名称
    const fileNeckedName = StringUtils.removeExt(template.fileName)

    let filename = await askAQuestion('生成模板文件名:', fileNeckedName + '.tpl')

    const filedir = path.resolve(process.cwd(), 'templates', targetPath, filename)

    // 模板名称
    let name = await askAQuestion('模板名称:', fileNeckedName)

    // 模板描述
    let desc = await askAQuestion('模板描述:', '')
    
    const projectRoot = path.resolve(process.cwd())
    const relatedPath = StringUtils.getPathFromFileDir(template.positiveTempateRootFileName).replace(projectRoot + "/", '');
    // 模板生成地址
    let targetFilePath = await askAQuestion('模板目标地址(使用模板生成的文件默认地址):',  '@projectRoot/' + relatedPath)

    // 替换变量
    let questions = require('../const/initTemplateQuestion')

    let answers = await muilpulAsk('变量设置', questions)
    
    // 整合内容
    // 1. 生成模板注释
    let fileDesc = {
      name: name,
      description: desc,
      ext: StringUtils.getExt(template.fileName),
      targetPath : targetFilePath
    }

    const note = Note.parseNote(fileDesc, answers) 

    // 2. 替换原来文件中的字符串
    let text = template.content

    if (answers.length > 0) {
      answers.forEach( ans => {
        const replaceString = '<{'+ ans.name + '}>'
        text = StringUtils.replaceAll(text, ans.replaceString, replaceString)
      })
    }

    // 3. 拼接内容，生成文件
    // 去掉或者替换掉模板中的注释
    if (StringUtils.containComment(text)) {
      text = StringUtils.replaceComment(text, Note.getComment())
    } else {
      text += note.getComment
    }

    const content = note + text
    await FileUtils.pathCheckAndMkdir(StringUtils.getPathFromFileDir(filedir))
    let fd = fs.openSync(filedir, 'w')
    fs.writeFileSync(fd, content);
    fs.closeSync(fd)

    // 4. 重新刷新 模板目录
  }
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
