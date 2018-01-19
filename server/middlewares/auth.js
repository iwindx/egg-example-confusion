import request from './async';
import config from 'config';

export default {
  // 验证token
  async tokenCheck(ctx, next) {
    const {token} = ctx.request.headers;
    try {
      // 验证access_token 是否有效， 记teambition 验证token的频率一分钟不能超过60次
      const result = await request.axios_get(
        `${config.api}/api/applications/${config.clientId}/token/check`,
        token
      );
      if (result.status === 200) {
        await next();
      } else {
        ctx.body = {
          status: 401,
          error: new Error('无效的token')
        };
      }
    } catch (e) {
      return next(e);
    }
  },
  // 登录授权teambition
  async login(ctx, next) {
    const {code} = ctx.params;
    try {
      const result = await request.axios_post(`${config.account_api}/oauth2/access_token`, {
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code: code
      });
      // 以access_token 查询teambition当前用户信息
      // const user = await request.axios_get(`${config.api}/api/users/me`, result.data.access_token);
      ctx.body = {status: 200, result: result.data};
    } catch (e) {
      return next(e);
    }
  }
};
