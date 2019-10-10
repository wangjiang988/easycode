/**
 * 对easycode 类的测试用例
 */
const EasyCode = require('autoGenCode/easycode/lib/EasyCode')

const easycode = new EasyCode()

// 制作单个模板对象
// easycode.makeSingleTemplate('demo_template44')

// 制作模板组
// easycode.makeGroupTemplate('curd')

// 重新生成配置文件的模板描述
// easycode.reloadTemplateConfig()

easycode.renderTemplatePath()
