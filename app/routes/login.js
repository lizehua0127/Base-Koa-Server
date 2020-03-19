const Router = require('koa-router')
const {doLogin} = require('../service/LoginService')

const router = new Router()

router.post('/login', doLogin)

module.exports = router