
module.exports = {

    /**
     * 首字母大写
     * @param {*} str 
     */
    firstUpperCase(str) {
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
        if(stringList <= 1) return string 
        let ret = stringList[0].toLowerCase()
        for(let i = 1 ; i < stringList.length; i++) {
            ret += stringList[i].replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
        }
        return ret
    }
}
