import Router from 'koa-router'
import {doLogin} from '../service/LoginService'

const router = new Router()

router.post('/login', doLogin)

export default router