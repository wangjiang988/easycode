/**
 * 模板文件生成器
 * tempate Tempate 对象
 * templateType 模板类型
 */
const MetalSmith = require('metalsmith')
const delimiters = require('handlebars-delimiters');
const Handlebars = require('handlebars');
const renamer = require("metalsmith-renamer")
const justSingleFile = require("./metalsmith/metalsmithSingleFile")
const { ask } = require('./ask')

// 重新定义标示符号，避免跟vue的模板渲染冲突
delimiters(Handlebars, ['<{', '}>']);

const { renderTemplateFiles } = require('./metalsmith/metalsmithPlugin')
const logger = require('./logger')

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

  init(template) {
    this.template = template
    if (template instanceof Array) {
      this.template_type = 'group'
    } else {
      this.template_type = 'single'
    }
    this.easycode = null
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
    const metalsmith = MetalSmith(this.template.templateRootPath)
    // 单文件询问生成文件名称
    const targetFileNameAns = await ask([{
      name: 'targetFileName',
      message: '待生成文件名称',
      default: this.template.name
    }])

    let metadata = await ask(this.template.variables)

    metadata.targetFileName = targetFileNameAns.targetFileName + '.' + this.template.ext

    // 从easycode对象中获取全局变量
    const globalVaris = this.getGlobalVariablesFromEasycode()

    Object.assign(metalsmith.metadata(), metadata, { root: globalVaris})

    // console.log("模板中将使用的变量：", metadata)
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
      .destination(this.template.targetPath)
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
}
