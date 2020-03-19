const Router = require('koa-router')
const test = require('./test')
const login = require('./login')

const router = new Router()
router.prefix('/api')
// routes表示的是路由的嵌套处理
router.use(test.routes(), test.allowedMethods())
router.use(login.routes(), login.allowedMethods())

module.exports = router