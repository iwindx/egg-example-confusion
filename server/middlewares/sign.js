import config from 'config'

export const gen_session = (user, res) => {
  let auth_token = `${user._id}$$$$` // 以后可能会存储更多信息，用 $$$$ 来分隔
  let opts = {
    path: '/',
    domain: config.domain,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    signed: true,
    httpOnly: true
  }
  res.cookie(config.auth_cookie_name, auth_token, opts) //cookie 有效期7天
}
