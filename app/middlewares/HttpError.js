import {log} from '../utils/LogUtils'

async function catchError(ctx, next) {
  // log.info('middlewares : catchError start')
  try {
    await next()
    if (ctx.status >= 400) {
      ctx.throw(ctx.status)
    }
  } catch (err) {
    let status = err.status || 500
    // let message = e.message || 'Server Error!'
    ctx.status = status
    if (ctx.status === 500) {
      log.error('server error', err, ctx)
    } else {
      log.error('request wrong',ctx)
    }
  }
  // log.info('middlewares : catchError finsh')
}

export default catchError