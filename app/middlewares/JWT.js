const koaJwt = require( 'koa-jwt')
const jwt = require( 'jsonwebtoken')
const log = require( '../utils/LogUtils')

const secret = 'sssssssssss'
const expiresTime = 60 * 60 * 24

async function authorizationErr(ctx, next) {
  try {
    // log.info('authorizationErr start')
    // 解析token 中的数据，将数据放在ctx 中 的userContent中使用
    const token = ctx.header.authorization  // 获取jwt
    if (token) {
      try {
        let payload = validationToken(token)
        ctx.userContent = payload
        // log.info(ctx.userContent)
      }catch (e) {
        log.error(e)
      }
    }
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        msg: '请先登陆'
      }
    }
  }
  // log.info('authorizationErr finsh')
}

let koaConfig = koaJwt({secret: secret})
.unless({path: [/^\/api\/login/]})

function validationToken(token) {
  let info = jwt.verify(token.split(' ')[1], secret)
  return info
}

function genToken(data) {
  let token = jwt.sign(data, secret, {expiresIn: expiresTime})
  return token
}

module.exports = {
  authorizationErr: authorizationErr,
  koaConfig: koaConfig,
  genToken: genToken
}