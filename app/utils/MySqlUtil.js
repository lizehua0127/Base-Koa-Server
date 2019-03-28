import config from '../../config/config'

const mysql = require('mysql')
let log = require('./LogUtils').log

let pool = mysql.createPool({
  connectionLimit: 20,
  host: config.sqlServer,
  user: config.sqlUser,
  password: config.sqlPassword,
  database: config.sqlDatabase,
  multipleStatements: true,  //是否允许执行多条sql语句
  charset: 'utf8mb4'
})

// connection.query('SELECT * FROM `books` WHERE `author` = ?', ['David'], function (error, results, fields) {
//   // error will be an Error if one occurred during the query
//   // results will contain the results of the query
//   // fields will contain information about the returned results fields (if any)
// });

//将结果已对象数组返回
let row = (sql, ...params) => {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err)
        return
      }
      connection.query(sql, params, function(error, res) {
        connection.release()
        if (error) {
          reject(error)
          return
        }
        resolve(res)
      })
    })
  })
}
//返回一个对象
let first = (sql, ...params) => {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err)
        return
      }
      connection.query(sql, params, function(error, res) {
        connection.release()
        if (error) {
          reject(error)
          return
        }
        resolve(res[0] || null)
      })
    })
  })
}
//返回单个查询结果
let single = (sql, ...params) => {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, connection) {
      if (err) {
        log.error('exec sql err:' + err)
        reject(err)
        return
      }
      connection.query(sql, params, function(error, res) {
        connection.release()
        if (error) {
          log.error('exec sql err:' + error)
          reject(error)
          return
        }
        for (let i in res[0]) {
          resolve(res[0][i] || null)
          return
        }
        resolve(null)
      })
    })
  })
}
//执行代码，返回执行结果
let execute = (sql, ...params) => {
  return new Promise(function(resolve, reject) {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err)
        return
      }
      log.info(`mysql execute :${sql} : params :${params}`)
      connection.query(sql, params, function(error, res) {
        connection.release()
        if (error) {
          log.error('exec sql err:' + error)
          reject(error)
          return
        }
        resolve(res)
      })
    })
  })
}

//模块导出
module.exports = {
  ROW: row,
  FIRST: first,
  SINGLE: single,
  EXECUTE: execute
}