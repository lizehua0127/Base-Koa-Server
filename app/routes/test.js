const Router = require('koa-router')
const log = require('../utils/LogUtils')
const requestManager = require('../service/RequestManager')

const router = new Router()

router.get('/test', async (ctx, next) => {
  ctx.body = 'hollow world'

  log.info(ctx.params)
  log.info(ctx.query)
  // let token = getHaiNaAccessToken()
})

router.get('/testjson', (ctx, next) => {
  ctx.body = {ab: 'fdsafd', fdsadf: '3334324'}
})

router.get('/testerr', (ctx, next) => {
  ctx.status = 403
  // throw new Error()
  ctx.body = {ab: 'fdsafd', fdsadf: '3334324'}
})

router.get('/testsql', async (ctx, next) => {
  log.info(data)
})

router.post('/msg', (ctx, next) => {
  log.info(JSON.stringify(ctx.request.body))

  if (ctx.request.body.msgType === 'notifyQrCodeContent') {
    requestManager.pushTrayOrders(ctx.request.body.robotId, ctx.request.body.deviceId, ctx.request.body.data.content)
  }

  ctx.body = {success: true}
})

module.exports = router