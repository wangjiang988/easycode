const os = require('os')

module.exports = {
  // 获取开始行
  getNoteStartLine () {
    return '\/** ' + this.getSperetor()
  },
  // 获取空白行
  getStarLine (text) {
    if (!text) text = ''
    return ' *' + text+ this.getSperetor()
  },
  // 获取注释行
  getNoteLine (variableName, variableValue) {
    return ' * @'+ variableName + '    ' + variableValue + this.getSperetor()
  },
  getNoteEndLine () {
    return ' *\/' + this.getSperetor() + this.getSperetor()
  },
  // 根据系统不同，获取换行符
  getSperetor () {
    const env = os.platform()
    if (env == 'win32') { // window
      return '\r\n'
    } else if (env == 'darwin') { // mac
      return '\n'
    } else {
      return '\n'
    }
  },

  // 解析注释模板
  parseNote (fileDesc, ans) {
    let content = this.getNoteStartLine()
    content += this.getStarLine(' ***** 模板定义 ******')

    Object.keys(fileDesc).map(key => {
      content += this.getNoteLine(key, fileDesc[key])
    })

    content += this.getStarLine()
    content += this.getStarLine(' ***** 模板变量定义 ******')

    ans.forEach(item => {
      const itemValue = item.name +  '|' + item.default + '|' +item.description
      content += this.getNoteLine('variable', itemValue)
    })
    content += this.getNoteEndLine()
    return content
  }
}