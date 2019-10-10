/**
 * 字符串处理
 */
module.exports = {
  isEmpty: function(input) { 
    return input == null || input == ''; 
   }, 
   isNotEmpty: function(input) { 
    return !this.isEmpty(input); 
   }, 
   isBlank: function(input) { 
    return input == null || /^\s*$/.test(input); 
   }, 
   isNotBlank: function(input) { 
    return !this.isBlank(input); 
   }, 
  // 去左空格
  ltrim(s) {
    return s.replace(/(^\s*)/g, "");
  },
  // 去右空格
  rtrim(s) {
    return s.replace(/(\s*$)/g, "");
  },
  //去左右空格;
  trim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, "");
  },
  contains: function(input, searchSeq) { 
    return input.indexOf(searchSeq) >= 0; 
   }, 
  oneSpace(s) {
    return s.replace(/\s+/g, " ");
  },
  // 全局替换
  replaceAll(s, originString, replaceMentString) {
    return s.replace(new RegExp(originString, "gm"), replaceMentString);
  },
  startsWith: function (input, prefix) {
    return input.indexOf(prefix) === 0;
  },
  endsWith: function (input, suffix) {
    return input.endsWith(suffix) ;
  },
  /**
     * 处理注释 groovy代码
     * 去掉注释代码
     * @param text
     * @return
     */
  removeComment: function(s) {
      return s.replace(/\/\*{1,2}[\s\S]*?\*\//, '')
  },
  // 获取文件路径字符串中的文件名
  getFileName: function(s) {
    const sArr = s.split("/")
    return sArr[sArr.length - 1] ? sArr[sArr.length - 1] : ''
  },


  /**
     * 首字母大写
     * @param {*} str 
     */
  firstUpperCase: function(str) {
      if(typeof str != 'string') {
          str = str+''
      }
      return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
  },

  /**
   * 首字母小写
   * @param {*} str 
   */
  firstLowerCase(str) {
      if(typeof str != 'string') {
          str = str+''
      }
      return str.replace(/( |^)[A-Z]/g, (L) => L.toLowerCase());
  },

  /**
   * 字符串转全部小写字母
   */
  toLowerCase(str) {
      if(typeof str != 'string') {
          str = str+''
      }
      return str.toLowerCase()
  },

  /**
   * 字符串全部大写字母
   */
  toUpperCase(str) {
      if(typeof str != 'string') {
          str = str+''
      }
      return str.toUpperCase()
  },

  /**
   * 字符串替换
   * @param {*} string 
   * @param {*} replace 
   * @param {*} replacement 
   */
  replace(string, replace, replacement) {
      if(typeof string != 'string') {
          string = string+''
      }
      var regex = new RegExp(replace, 'g')
      return string.replace(regex, replacement)
  },
  
  /**
   * 字符串下划线转驼峰
   */
  parse_toTf(string) {
      let stringList = string.split('_')
      if(stringList.length <= 1) return string 
      let ret = stringList[0].toLowerCase()
      for(let i = 1 ; i < stringList.length; i++) {
          ret += stringList[i].replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
      }
      return ret
  },

  /**
   * 去掉字符串后缀名
   * @param {}} string 
   */
  removeExt (string) {
    let stringList = string.split('.')
    if (stringList.length <= 1) return string
    else {
      stringList.pop()
      return stringList.join('.')
    }
  }
}
