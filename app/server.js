import Koa from 'koa'
import http from 'http'
import convert from 'koa-convert'
import cors from 'koa-cors' //跨域
import bodyParser from 'koa-bodyparser' //请求体JSON解析
import onerror from 'koa-onerror' //错误处理

import routes from './routes'
import config from '../config/config'
import {log} from './utils/LogUtils'
import catchError from './middlewares/HttpError'
import {koaConfig,authorizationErr} from './middlewares/JWT'

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
app.use(authorizationErr)
app.use(koaConfig)

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

export default app