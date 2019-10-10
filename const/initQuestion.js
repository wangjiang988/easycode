/**
 * 项目初始化用的一些参数问答条件
 */

const questions = [
    {
      type: 'input',
      name: 'name',
      message: '项目名称',
      default: ''
    },
    {
      type: 'input',
      name: 'description',
      message: '项目描述',
      default: ''
    },
    {
      type: 'input',
      name: 'author',
      message: '作者',
      default: ''
    },
    {
      type: 'input',
      name: 'version',
      message: '版本',
      default: '1.0.0'
    }
  ]

  module.exports = questions