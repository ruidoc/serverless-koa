import Router from '@koa/router'
import UserMode from '../models/users.js'
import { respond, genPassword, genoJwt } from '../utils/index.js'

var router = new Router({
  prefix: '/user',
})

router.post('/login', async (ctx, next) => {
  // ctx.router available
  let { body } = ctx.request
  if (body.password) {
    body.password = genPassword(body.password)
  }
  try {
    let result = await UserMode.findOne(body, {
      __v: 0,
      others: 0,
      password: 0,
      created_at: 0,
    })
    if (!result) {
      throw { code: 11403 }
    }
    let { _id, username, phone } = result
    let token = genoJwt({
      _id,
      username,
      phone,
    })
    let user_info = JSON.parse(JSON.stringify(result))
    user_info.env = body.env || 'test'

    let res_data = {
      token,
      user_info,
    }
    ctx.body = respond(res_data)
  } catch (err) {
    // console.log(err)
    let res = respond(err)
    ctx.status = res.code || 500
    ctx.body = res
  }
})

export default router
