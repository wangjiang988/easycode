const path = require('path')
const { TemplateParser } = require('./parser/templateParser')
const Generator = require('./Generator')
const ObjectUtils = require('./util/objectUtils')
const StringUtils = require('./util/stringUtils')
const yamlUtil = require('./util/yamlUtil')
const FileUtils = require('./util/fileUtil')
const logger = require('./logger')
const { ask, askIfContinue, muilpulAsk, groupAsk} = require('./ask')
const { templateInfo, generateYamlFile, arryObject_to_object } = require('./common')

/**
 * 获取当前的配置文件
 * 并实现该配置文件的相关功能
 * config easycode.yaml文件对象
 * 功能： 1. 解析配置文件， 并将对应变量作为属性
 *       2. 生成模板
 *       3. 初始化一个easycode.yaml
 */
class EasyCode {
  constructor(init) {
    // 路径下是否有配置文件
    this.inited = !init

    if (!init) { // 有配置文件走这里
      // 生成一些全局变量
      // 全局当前时间
      // 读取配置文件
      this.readYaml()
      this.initGlobalVarible()
    } else {
      // 设置一些空属性
      // 设置属性
      this.name = ''
      this.description = ''
      this.author = ''
      this.version = ''
      // 当前项目路径
      this.projectRoot = path.resolve(process.cwd())
      this.rootVariables = {}
      // 全局变量
      this.metadata = {}
      // 全局路径变量
      this.pathMetadata = {}
      // 全局模板文件对象
      this.singleTemplates = []
      // 模板组
      this.groupTemplates = []  
    }
    this.generator = new Generator()
  }

  // 初始化对象
  // 跟readYaml 相对  readYaml方法是从配置文件中读取配置
  // 这里通过命令行来获取变量
  async init(callback) {

    // 查看当前路径下是否已经有配置文件
    if (this.hasEasyCodeCfg()) {
      const ifContinue = await askIfContinue("已存在配置文件，是否继续")
      if(!ifContinue)  return 
    }
    
    const templateInfos = await this.scanTemplatePath()
    // 
    const questions = require('../const/initQuestion')

    const answers = await ask(questions)
    // todo  这两个全局变量需要用命令行的方式添加
    const metadataQuestion = [
      {
        type: 'input',
        name: 'name',
        message: '变量名'
      },
      {
        type: 'input',
        name: 'value',
        message: '变量值'
      },
    ]
    // 询问是否设置全局变量
    answers.metadata = {}
    const ifContinueSetGlobalMetadata = await askIfContinue("是否设置全局模板变量")
    if (ifContinueSetGlobalMetadata) {
      answers.metadata = arryObject_to_object(
        await muilpulAsk('全局模板变量设置', metadataQuestion),
        'name',
        'value'
      )
    } 
    const ifContinueSetGlobalPathMetadata = await askIfContinue("是否全局模板路径变量")

    answers.pathMetadata = {}
    if (ifContinueSetGlobalPathMetadata) {
      answers.pathMetadata = arryObject_to_object(
        await muilpulAsk('全局模板路径变量设置', metadataQuestion),
        'name',
        'value'
      )
    }
    
    answers.templates = templateInfos
    // 生成配置文件对象
    const projectRoot = path.resolve(process.cwd())
    const configFilePath = path.resolve(projectRoot, 'easycode.yaml')
  
    generateYamlFile(configFilePath, answers)

    // 初始化本地模板目录
    this.renderTemplatePath()
  }

  /**
   * 查看当前是否有配置文件
   */
  hasEasyCodeCfg () {
    const projectRoot = path.resolve(process.cwd())
    const configFilePath = path.resolve(projectRoot, 'easycode.yaml')
    return FileUtils.checkFileOrPathExist(configFilePath)
  }

  /**
   * 渲染本地模板路径
   * 逻辑： 复制一个本地的模板文件过去
   * TODO 这里回头改一下
   */
  renderTemplatePath () {
    const generator = new Generator()
    const sourcePath = path.resolve(__dirname, '../templates')
    const destination = path.resolve(process.cwd(), './templates')

    generator.simpleCopyPath(sourcePath, destination)
  }


  /**
   * 扫描模板路径下的模板文件，获取模板描述
   */
  async scanTemplatePath () {
    // 定义全局路径变量
    // 扫描模板文件夹路径，生成所有模板文件的描述
    let templateInfos = {
      singles: [],
      groups: []
    }
    const templatePath = path.resolve(process.cwd(), './templates')
    await templateInfo(templatePath, templatePath, templateInfos, this)
    return templateInfos
  }

  // 
  readYaml() {
    const projectRoot = path.resolve(process.cwd())
    const configFilePath = path.resolve(projectRoot, 'easycode.yaml')

    let config = yamlUtil.readYamlFileAndReturnJson(configFilePath)
    // 解决属性之间的继承关系
    config = this.parseConfig(config)
    // 设置属性
    this.name = config.name
    this.description = config.description
    this.author = config.author
    this.version = config.version
    // 当前项目路径
    this.projectRoot = projectRoot
    this.rootVariables = config.rootVariables
    // 全局变量
    this.metadata = config.metadata
    // 全局路径变量
    this.pathMetadata = config.pathMetadata
    // 全局模板文件对象
    this.singleTemplates = config.templates.singles
    // 模板组
    this.groupTemplates = config.templates.groups
  }

  // 定义一些全局变量来供模板使用
  // TODO
  initGlobalVarible() {
    // 获取当前运行时间
    // const currentTimeString = 
  }

  /**
   * 解决属性直接的依赖关系
   * 1.根属性可以被metadata和templates内属性继承
   * 2.metadata属性可以被templates内属性使用
   * @param {*} config 
   */
  parseConfig(config) {
    // rootVariables 根属性值
    const rootVariables = ObjectUtils.getRootProperties(config)
    // console.log('parseConfig', config)
    // console.log('rootVariables', rootVariables)
    // 解析metadata
    config.metadata = this.doParseConfig(config.metadata, rootVariables)
    config.pathMetadata = this.doParseConfig(config.pathMetadata, rootVariables)
    // 跟变量， metadata, pathMetadata 将作为easycode 全局替换的变量
    // 在所有的模板中都可以使用
    config.templates = this.doParseConfig(config.templates, {
      ...rootVariables,
      'metadata': config.metadata,
      'pathMetadata': config.pathMetadata
    })

    config.rootVariables = rootVariables
    // 解析tempates
    // Object.assign(rootVariables, config.metadata, config.pathMetadata)

    return config
  }

  /**
   * 替换元素中的@变量
   * @param {*} target 
   * @param {*} config 
   */
  doParseConfig(target, config) {
    if (StringUtils.isEmpty(target)) return target
    // 遍历目标对象，找出含有config中变量的数据，并替换掉值
    Object.keys(target).map(k => {
      let item = target[k]
      // 如果是字符串 则进行变量替换
      if (typeof item == 'string') {
        target[k] = this.replaceValue(item, config)
      }
      // 如果是对象，则进行递归遍历
      if (typeof item == 'object') {
        this.doParseConfig(item, config)
      }
    })

    return target
  }

  replaceValue(item, config) {
    if (!StringUtils.contains(item, '@')) return item

    Object.keys(config).map(k => {
      const configValue = config[k]
      // 如果config有对象, 继续深层遍历，找到替换值直接返回。
      if (typeof configValue == 'object') {
        item = this.replaceValue(item, configValue)
        if (!StringUtils.contains(item, '@')) return item
      }

      const variKey = '@' + k

      if (StringUtils.contains(item, variKey)) {
        item = StringUtils.replaceAll(item, variKey, configValue)
      }
    })

    return item
  }

  /**
   * 生成单个模板
   */
  makeSingleTemplate(templateName) {
    let targetTemplate = null
    for (let i = 0; i < this.singleTemplates.length; i++) {
      const t = this.singleTemplates[i]
      if (t.name == templateName) {
        targetTemplate = t
        break
      }
    }

    if (targetTemplate == null) {
      console.error('模板名称不存在')
      process.exit()
    }

    // 生成模板
    this.domakeTemplate(targetTemplate)
  }

  /**
   * 生成模板
   * @param {*} targetTemplate 
   */
  domakeTemplate(targetTemplate) {
    TemplateParser.parse(targetTemplate.filePath, (t) => {
      const generator = new Generator(t)
      generator.setEasyCode(this)
      generator.generate()
    })
  }

  async AsyncDomakeTemplate(targetTemplate) {
    const globalVaris = Object.assign({}, this.rootVariables, this.metadata)
    const t = await TemplateParser.AsyncParse(targetTemplate.filePath, globalVaris, this)
    this.generator.init(t, this)
    await this.generator.generateSingle()
    logger.success('生成结束')
  }

  /**
   * 生成模板组
   */
  async makeGroupTemplate(groupName) {
    // 匹配group
    let targetGroup = null
    for (let i = 0; i < this.groupTemplates.length; i++) {
      const group = this.groupTemplates[i]
      if (group.name == groupName) {
        targetGroup = group
        break
      }
    }
    // 读取模板组的配置文件，获取全局配置变量
    let groupConfig = this.readGroupConfig(targetGroup.rootPath)
    let groupAns = await groupAsk('模板组变量设置:', groupConfig.public_variables)
    groupAns = ObjectUtils.arrayToObject(groupAns)
    // if (typeof groupConfig.mysql != undefined) {
    //   groupAns['mysql'] = groupConfig.mysql
    // } 
    Object.assign(groupAns, groupConfig)
    // 将配置中的全局变量加入到全局变量中
    this.rootVariables = Object.assign(this.rootVariables, { group: groupAns})
    // 开始生成group模板组
    if (targetGroup !== null && targetGroup.children.length > 0) {
      for (let j = 0; j < targetGroup.children.length; j++) {
        const singleTemplate = targetGroup.children[j]
        await this.AsyncDomakeTemplate(singleTemplate)
      }
    }
  }

  /**
   * 读取模板组的默认配置
   * @param {*} groupRootPath 
   */
  readGroupConfig (groupRootPath) {
    const configYamlFile = path.resolve(process.cwd(), './templates', groupRootPath, 'group.yaml')
    const groupConfig = yamlUtil.readYamlFileAndReturnJson(configYamlFile)
    return groupConfig
  }


  // 重新生成easycode.yaml中的模板描述
  async reloadTemplateConfig () {
    const templateInfos = await this.scanTemplatePath()
    // 读取配置
    const projectRoot = path.resolve(process.cwd())
    const configFilePath = path.resolve(projectRoot, 'easycode.yaml')
    let config = yamlUtil.readYamlFileAndReturnJson(configFilePath)

    config.templates = templateInfos

    generateYamlFile(configFilePath, config)
  }
}



module.exports = EasyCode
