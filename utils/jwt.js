import koajwt from 'koa-jwt'
import jwt from 'jsonwebtoken'
import jwt_conf from '../config/jwt.js'

// 密匙
const SECRET_KEY = 'bigger_midserver_jwt_8854'

// 生成jwt
export const genoJwt = data => {
  let token = jwt.sign(data, SECRET_KEY, { expiresIn: jwt_conf.expires })
  return token
}

// 验证jwt
export const verifyJwt = () => {
  return koajwt({
    secret: SECRET_KEY,
    algorithms: ['HS256'],
    key: 'auth',
  }).unless({
    path: jwt_conf.paths,
  })
}
