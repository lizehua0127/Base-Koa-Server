import {log} from '../utils/LogUtils'
import {genToken} from '../middlewares/JWT'
import {QUERY_FAILED, REQUEST_FAILED, setError} from '../utils/ErrorResponseUtil'

async function doLogin(ctx, next) {
  ctx.body = {
    token: genToken({uid:324})
  }

}

module.exports = {
  doLogin: doLogin
}