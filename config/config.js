const merge = require('lodash')
const development = require('./development')
const production = require('./production')
const test = require('./test')

const env = process.env.NODE_ENV || 'development'

const configs = {
  development: development,
  test: test,
  production: production
}

const defaultConfig = {
  env: env
}

const config = merge.merge(defaultConfig, configs[env])

module.exports = config