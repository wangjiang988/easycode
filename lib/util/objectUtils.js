/**
 * 对象处理
 */
module.exports = {
  /**
   * 获取对象的根属性
   * @param {}} obj 
   */
  getRootProperties(obj) {
    let rootVariables = {}
    Object.keys(obj).map(key => {
      if(typeof obj[key] === 'string') {
        rootVariables[key] = obj[key]
      }
    })
    return rootVariables
  },
  
  arrayToObject (array) {
    let obj = {}
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      Object.assign(obj, element)
    }
    return obj
  }
}
