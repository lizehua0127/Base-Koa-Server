const Koa = require('koa')
const http = require('http')
const convert = require('koa-convert')
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser') //请求体JSON解析
const onerror = require('koa-onerror') //错误处理

const routes = require('./routes')
const config = require('../config/config')
const log = require('./utils/LogUtils')
const catchError = require('./middlewares/HttpError')

const app = new Koa()

//------------------ middlewares start ------------------
app.use(async (ctx, next) => {
  // log.info('middlewares : time start')
  const start = new Date()
  await next()
  const ms = new Date() - start
  log.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
  // log.info('middlewares : time finsh')
})
app.use(convert(cors()))
app.use(catchError)
// app.use(authorizationErr)
// app.use(koaConfig)

onerror(app)
app.use(bodyParser())
//------------------ middlewares end ------------------

// routes
app.use(routes.routes())
app.use(routes.allowedMethods())


app.on('error', (error, ctx) => {
  log.error('奇怪的错误' + JSON.stringify(ctx.onerror))
  log.error('server error:' + error)
})

http.createServer(app.callback())
    .listen(config.port)
    .on('listening', function() {
      log.info('正在监听端口' + config.port)
    })

module.exports = app