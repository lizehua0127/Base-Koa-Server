import Router from 'koa-router'
import {log} from '../utils/LogUtils'

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

export default router