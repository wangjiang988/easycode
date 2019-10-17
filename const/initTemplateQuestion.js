/**
 * 项目初始化用的一些参数问答条件
 */

const questions = [
  {
    type: 'input',
    name: 'replaceString',
    message: '被替换字符',
    default: '',
    validate: validateEmpty(val)
  },
  {
    type: 'input',
    name: 'name',
    message: '变量名',
    default: '',
    validate: validateEmpty(val)
  },
  {
    type: 'input',
    name: 'description',
    message: '变量描述',
    default: '',
    validate: validateEmpty(val)
  },
  {
    type: 'input',
    name: 'default',
    message: '默认值',
    default: '',
    validate: validateEmpty(val)
  }
]

function validateEmpty (val) {
  if(val == '') {
    return '不能为空'
  }
  return true
}

module.exports = questions