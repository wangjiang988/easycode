const fileUtil = require('./fileUtil')
const YAML = require('yaml')
const logger = require('../logger')
const home = require('user-home')


// yaml 文件的处理类    

/**
 * templateYamlProperty 模板属性的对应属性值
 * yanYaml 初始化项目配置文件
 * @return  返回改属性在yan.js中的值
 */
exports.getPropertyValue = (templateYamlProperty, yanYaml) => {
    // 如果属性值是
    if (typeof templateYamlProperty == 'string') {
        const fromString = 'from:'
        const defaultValue = ''
        if (templateYamlProperty.startsWith(fromString) || templateYamlProperty.indexOf(fromString) > 0) {
            const propertyList = templateYamlProperty.split("|")
            let defaultProperty = ''
            propertyList.forEach(property => {
                if (property.startsWith(fromString)) {
                    defaultProperty = property.split(':')[1]
                }
                if (property.startsWith('defaut:')) {
                    defaultValue = property.split(':')[1]
                }
            })
            return parseYamlAndGetVal(defaultProperty, yanYaml) || defaultValue
        } else {
            return templateYamlProperty
            // console.log(chalk.red('该属性值配置错误！'))
            // process.exit(-1)
        }
    } else {
        return parseYamlAndGetVal(templateYamlProperty.from, yanYaml) || templateYamlProperty.default
    }
}

exports.readYamlFileAndReturnJson = (yamlFile) => {
    try {
        const file = fileUtil.readFile(yamlFile)
        const doc = YAML.parseDocument(file)
        return doc.toJSON()
    } catch (error) {
        logger.fatal(error)
    }
}


parseYamlAndGetVal = (valueSetting, yanYaml) => {
    const path = valueSetting.split('.')
    let currentYamlCell = yanYaml
    const ret = null
    // # i从1开始  这样就避开了首节的project
    for (let i = 1; i < path.length; i++) {
        // 获取每 i+1层的key进行比对
        const keys = Object.keys(currentYamlCell)
        for (let j = 0; j < keys.length; j++) {
            if (keys[j] == path[i]) {
                if (i < path.length - 1) {
                    // 匹配成功，进行下级匹配
                    currentYamlCell = currentYamlCell[keys[j]]
                    continue
                } else if (i == (path.length - 1)) {
                    // 如果能匹配到最后一个结果，直接返回
                    return currentYamlCell[keys[j]]
                } else {
                    console.log('miss judge')
                }
            }
        }
    }
    return ret
}