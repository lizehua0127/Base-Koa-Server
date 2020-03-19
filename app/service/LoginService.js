const log = require( '../utils/LogUtils')
const {genToken}  = require( '../middlewares/JWT')

async function doLogin(ctx, next) {
  ctx.body = {
    token: genToken({uid:324})
  }

}

module.exports = {
  doLogin: doLogin
}