/**
 * 项目初始化用的一些参数问答条件
 */

const questions = [
  {
    type: 'input',
    name: 'name',
    message: '项目名称',
    default: '',
    validate: (val) => {
      if(val == '') {
        return '不能为空'
      }
      return true
    }
  },
  {
    type: 'input',
    name: 'description',
    message: '项目描述',
    default: '',
    validate: (val) => {
      if(val == '') {
        return '不能为空'
      }
      return true
    }
  },
  {
    type: 'input',
    name: 'author',
    message: '作者',
    default: '',
    validate: (val) => {
      if(val == '') {
        return '不能为空'
      }
      return true
    }
  },
  {
    type: 'input',
    name: 'version',
    message: '版本',
    default: '1.0.0',
    validate: (val) => {
      if(val == '') {
        return '不能为空'
      }
      return true
    }
  },
  {
    type: 'input',
    name: 'project_name',
    message: '项目英文名(将作为某写路径的前缀使用)',
    default: '',
    validate: (val) => {
      if(val == '') {
        return '不能为空'
      }
      return true
    }
  },
  {
    type: 'input',
    name: 'git_path',
    message: '模板地址(将拉取作为templates下的模板的初始模板)',
    default: '',
    validate: (val) => {
      if(val == '') {
        return '不能为空'
      }
      return true
    }
  },
  {
    type: 'input',
    name: 'git_branch',
    message: '模板git分支(拉取分支)',
    default: 'master',
    validate: (val) => {
      if(val == '') {
        return '不能为空'
      }
      return true
    }
  }
]

module.exports = questions