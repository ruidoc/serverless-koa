import Router from '@koa/router'
const router = new Router()

router.get('/', (ctx, next) => {
  ctx.body = '欢迎使用 Serverless API'
})

export default router
