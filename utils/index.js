import { genPassword } from './crypto.js'
import { genoJwt } from './jwt.js'

export { genPassword, genoJwt }

export const respond = (data, code = 200) => {
  let res = { code }

  if (data === undefined) {
    res.code = 500
    res.message = '服务器内部错误'
    return res
  }

  if (data === null) {
    res.data = null
    return res
  }

  if (data instanceof Error) {
    let realdate = data
    if (realdate._message) {
      res.code = 400
      res.message = realdate.message || realdate._message
    } else if (realdate.statusCode) {
      res.code = realdate.statusCode
      res.message = realdate.json.message
    } else {
      res.code = 500
      res.name = data.name
      res.message = data.message
    }
  } else {
    if (data._message) {
      res.code = 400
      res.message = data._message
    }
    if (data._error) {
      res.code = 500
      res.message = data._error
    }
    if (data.errcode) {
      res.code = 500
      res.errcode = data.errcode
      res.message = data.errmsg
    }

    if (data.code == 11403) {
      res.code = 403
      res.message = '用户信息验证失败'
    }

    if (data.code == 12403) {
      res.code = 403
      res.message = '权限不足'
    }
  }

  if (res.code == 200) {
    res.data = data
  }
  return res
}
