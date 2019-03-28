import Router from 'koa-router'
import test from './test'
import login from './login'

const router = new Router()
router.prefix('/api')
// routes表示的是路由的嵌套处理
router.use(test.routes(), test.allowedMethods())
router.use(login.routes(), login.allowedMethods())

export default router