/**
 *
 * ***** 模板定义                         *****
 * @name <{root.group.model}>create
 * @description <{root.group.model}>测试更新模板
 * @ext js 
 * @targetPath  @projectRoot/src
 * ***** 模板内变量: 变量名称|默认值|变量描述 *****
 * @variable    func_name|fabulous|方法名称
 * @variable    desc|<{root.group.model}>默认模板文件|待生成文件描述
 * ****** 全局常用变量                     *****
 * projectRoot     当前命令行所在路径，通常是项目路径，也是有配置文件easycode.yaml的路径
 * now_datetime    当前系统时间 格式为YYYY-mm-dd HH:MM:ss
 * now_date        当前日期 格式为YYYY-mm-dd
 * 还有其他配置文件中的根属性和metadata中定义的属性都可以在模板中使用
 * 全局变量通过加root来定义
 * 如： root.now_date, root.author 等等
 */

 /**
 * @date_time <{root.now_date}>
 * @description <{desc}>
 * 这是一个 create 测试文件可删除
 */

function <{root.group.model}> () {
    let author = '<{root.author}>'
    console.log('作者是:' + author)
}

<{func_name}>()