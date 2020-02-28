const EasyCode = require('../lib/Easycode')

module.exports = (action, forWhat) => {
    if (action == 'init') {
      init()
    } else if (action == 'refresh') {
      refresh(forWhat)
    }
}

function init() {
  const easycode = new EasyCode(true)
  easycode.init()
} 

function refresh (what) {
  if(what == 'template') {
    refreshTemplate()
  } else {
    refreshTemplate()
  }

}

function refreshTemplate(){
  const easycode = new EasyCode(true)
  easycode.reloadTemplateConfig()
}