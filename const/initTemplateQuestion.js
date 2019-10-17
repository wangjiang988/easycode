/**
 * 项目初始化用的一些参数问答条件
 */

const questions = [

    {
      type: 'input',
      name: 'name',
      message: '变量名',
      default: ''
    },
    {
      type: 'input',
      name: 'replaceString',
      message: '被替换字符',
      default: ''
    },
    {
      type: 'input',
      name: 'description',
      message: '变量描述',
      default: ''
    },
    {
      type: 'input',
      name: 'default',
      message: '默认值',
      default: ''
    }
  ]

  module.exports = questions