const path = require('path')
const { Template } = require('../lib/parser/templateParser')
const Generator = require('../lib/Generator')
const configAction = require('./config')

module.exports = (action, filepath) => {
    if (action == 'make') makeTemplate(filepath)
    else makeTemplate(filepath)
}

/**
 * 制作模板
 * @param {h} filepath 
 */
async function makeTemplate (filepath) {
    // 获取文件内容
    const template = new Template(filepath, true)
    const generator = new Generator()
    await generator.makeTemplate(template)
    configAction('refresh', 'template')
}

