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
  }
}
