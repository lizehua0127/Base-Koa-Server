const log4js = require('log4js')

let appenders = {
  out: {
    type: 'stdout',
    layout: {
      type: 'pattern',
      pattern: '%[%d{yyyy-MM-dd hh:mm:ss.SSS} %p\t%m%]'
    }
  },
  log_file: {
    type: 'file',
    filename: './logs/all_logs.log',
    maxLogSize: 10485760,
    backups: 10,
    layout: {
      type: 'pattern',
      pattern: '%d{yyyy-MM-dd hh:mm:ss.SSS} [%p]\t%m'
    }
  },
  err_file: {
    type: 'file',
    filename: './logs/error_log.log',
    maxLogSize: 10485760,
    backups: 10,
    layout: {
      type: 'pattern',
      pattern: '%d{yyyy-MM-dd hh:mm:ss.SSS} [%p]\t%m'
    }
  },
  just_errors: {
    type: 'logLevelFilter', appender: 'err_file', level: 'error'
  }
}

let categories = {
  default: {
    appenders: [
      'out',
      'log_file',
      'just_errors'
    ],
    level: 'debug'
  }
}

let log = log4js.configure({
  appenders: appenders,
  categories: categories
})

module.exports = {
  log: log.getLogger()
}
