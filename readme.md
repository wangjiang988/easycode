## 刷新 模板库

进入项目文件夹下 初始化项目配置文件
easy config init

// TODO 一个项目可以加载多个模板库， 目前多个模板库只能手动考进去  
模板库项目可以参考 https://github.com/wangjiang988/easytpl_java

新增过模板后，更新配置文件的模板库
easy config refresh

## 新增模板（组）
easy make  模板名(模板组名)
如 easy make demo

`注：项目下的 simple-curd 为一个模板组，可参考这个去做项目。支持mysql的实体类字段的自动初始化`

## 制作模板 

easy template make 文件路径

## 模板语法解析

> tpl中的语法解析

    /**   
    * ***** 模板定义 ******  
    * @name    Entity  
    * @filename    <{root.group.model}>Entity  实际生成的文件名
    * @description    实体类  
    * @ext    java  实际生成的文件名后缀
    * @targetPath    @projectRoot/<{root.project_name}>-domain/src/main/java/<{root.metadata.basePackagePath}>/<{root.project_name}>/domain/entity  实际文件生成所在的文件夹地址
    * @javaFieldParser <{root.group.table_name}>  模板组解析数据库表字段
    *  
    * ***** 模板变量定义 ******  
    * @variable    desc|<{root.group.model_desc}>实体类|待生成文件描述    
    */

## 使用方法
> npm i -g @wangjiang988/easycode

> 查看命令行是否可以使用easy命令，如果不可以，请看下你的环境变量是否有npm的执行路径

> windows 推荐使用 git bash 命令行执行

> 如果输入easy 报错，请到我的git 项目地址拷贝最新代码 替换到你本地安装的路径。具体路径可以百度查询 npm -g安装的路径在哪里



