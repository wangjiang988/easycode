const StringUtil = require('../util/StringUtil')
const { MysqlHandler }  = require('../MysqlHandler')
const Handlebars = require('handlebars');

/**
 * javaFieldParser  
 * 处理字段生成实体注释
 */
class JavaFieldParser {
    constructor(config) {
      this.config = config
      // 先写死，后面再想办法
      this.templateString = '@TableField(value = "<{COLUMN_NAME}>")\r\n'
                     + '@ApiModelProperty(value = "<{COLUMN_COMMENT}>")\r\n'
                     + 'private <{COLUMN_TYPE}> <{COLUMN_FIELD}>;\r\n'
      this.shouldSkipField = ['id', 'uuid', 'created_time', 'created_by_id', 'created_by_name',
                            'updated_time', 'updated_by_id', 'updated_by_name', 'del_flag', 'status', 'description', 'remark']
    }
  
    // ['id', 'uuid', 'status' ....]
    setShouldSkipField(fields) {
      this.shouldSkipField = fields
    }
  
    async parseFieldToEntity (table_name) {
      const handler = new MysqlHandler(this.config)
    //   const template = Handlebars.compile(this.templateString)
      return new Promise((res, rej) => {
        handler.getTableStruct(table_name, (results) => {
            let stringArr = []
            for (let index = 0; index < results.length; index++) {
                const element = results[index];
                // 有些字段需要跳过
                if (this.shouldSkip(element)) continue
                const parsedElement = this.parseFieldTypeAndName(element)
                // const ret = template(parsedElement)
                stringArr.push(parsedElement)
            }
            res(stringArr)
        })
      })
      
    }
  
    shouldSkip(element) {
      for (let index = 0; index < this.shouldSkipField.length; index++) {
        const e = this.shouldSkipField[index];
        if (element.COLUMN_NAME == e ) {
           return true
        }
      }
      return false
    }
  
    parseFieldTypeAndName (element) {
      element.COLUMN_FIELD = StringUtil.parse_toTf(element.COLUMN_NAME)
      element.COLUMN_TYPE = this.parseFieldType(element.DATA_TYPE)
      return element
    }
  
    parseFieldType (type) {
      let retType = 'String'
      switch (type) {
        case 'int':
          retType = 'Integer' 
          break;
  
        case 'varchar':
          retType = 'String' 
          break;
        case 'double':
          retType = 'Double' 
          break;
  
        case 'tinyint':
          retType = 'Boolean' 
          break;
        case 'datetime':
          retType = 'Date' 
          break;
        default:
          break;
      }
      return retType
    }
  
  }

  module.exports = { 
    JavaFieldParser
  }