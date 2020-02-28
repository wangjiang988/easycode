const EasyCode = require('../lib/EasyCode')


module.exports = (templateName) => {
  makeTemplate(templateName)
}

function makeTemplate(templateName) {
  const easycode = new EasyCode()
  const template = searchTemplate(templateName, {
    singles: easycode.singleTemplates,
    groups: easycode.groupTemplates
  })
  if (template.children) {
    easycode.makeGroupTemplate(template.name)
  } else {
    easycode.makeSingleTemplate(template.name)
  }
}

function searchTemplate(templateName, templates) {
  let template = null
  // 先从单文件模板中选取
  templates.singles.forEach(item => {
    if (item.name === templateName)
    template = item
  })
  // 再从组模板里边找
  if (template == null) {
    templates.groups.forEach(item => {
      if (item.name === templateName) {
        template = item
      }
    })
  }

  return template
}

