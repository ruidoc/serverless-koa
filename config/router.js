import indexRouter from '../routers/index.js'
import userRouter from '../routers/user.js'

export const initRouter = app => {
  app.use(indexRouter.routes())
  app.use(userRouter.routes())
}
