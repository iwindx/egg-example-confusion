import jsdom from 'jsdom';
import request from './async';

export default {
 /**
  * -- {用户后台登录此用户的token} --
  * @param {String} email 邮箱 = 用户名 
  * @param {String} pwd 密码
  * @param {Promise} return 
  * @author:ls
  */
  async access_token(email, pwd) {
    let dom = await JSDOM.fromURL(`${config.account_api}/login`);
    let document = dom.window.document.getElementById('secrets');
    let clientId = document.getAttribute('data-clientid');
    let token = document.getAttribute('data-clienttoken');
    let result = await request.axios_post(`${config.account_api}/api/login/email`, {
      email: email,
      password: pwd,
      response_type: 'token',
      client_id: clientId,
      token: token
    });
    return result.data ? result.data.access_token : null;
  }
};
