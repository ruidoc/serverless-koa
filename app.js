import Koa from 'koa'
import http from 'http'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { verifyJwt } from './utils/jwt.js'
import { initRouter } from './config/router.js'
import { initConnect } from './config/mongo.js'

const app = new Koa()

app.use(cors())
app.use(verifyJwt())
app.use(bodyParser())

initRouter(app)

initConnect()

const server = http.createServer(app.callback())

server.listen(9000, () => {
  console.log(`listen to http://localhost:9000`)
})
