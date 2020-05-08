const mysql = require('mysql'); //注入MySQL模块
// const JavaFieldParser = require('./parser/javaFieldParser')

class MysqlConnection {
  constructor(config) {
    // config.connectionLimit = 10

    // const config = {
    //   host: host,     //数据库的地址，如：localhost
    //   port: port,     //数据库的地址，如：localhost
    //   user: user,     //登录名 默认root　　
    //   password: password,　　//登录密码
    //   database: database　　　　//数据库名字
    // }
    this.pool = mysql.createConnection(config)
    // this.connection.connect()
  }
  getConnection() {
    return this.pool
  }
}

/**
 *  mysql数据库处理类
 */
class MysqlHandler {
  constructor (config) {
    this.config = config
    this.conn = mysql.createConnection(config)
    this.conn.connect();

  }

  // 获取一个表的表结构
  getTableStruct (table_name, callback) {
    const queryString = `Select COLUMN_NAME , DATA_TYPE , COLUMN_COMMENT, ORDINAL_POSITION `
      + `from INFORMATION_SCHEMA.COLUMNS Where table_name = '${table_name}' and TABLE_SCHEMA='${this.config.database}'`
      + ' order by ORDINAL_POSITION'
    this.conn.query(queryString, (error, results, fields) => {
      // connection.release();
      if (error) {
        console.log(error)
        throw error
      } 
      callback(results)
    })
    this.conn.end();
  }
}
module.exports ={
  MysqlConnection,
  MysqlHandler
}

// config = {
//   host: '222.92.16.3',
//   port: '33061',
//   user: 'root',
//   password: '123456',
//   database: 'snd_carrier_center'
// }
// const mysqlHandler = new MysqlHandler(config)
// mysqlHandler.getTableStruct('carrier_park', (ret) => {
//   console.log(ret)
// })

