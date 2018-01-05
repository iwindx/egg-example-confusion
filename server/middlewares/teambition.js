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
    return new Promise((resolve, reject) => {
      const { JSDOM } = jsdom;
      return JSDOM.fromURL('https://account.teambition.com/login')
        .then(async dom => {
          let document = dom.window.document.getElementById('secrets');
          let clientId = document.getAttribute('data-clientid');
          let token = document.getAttribute('data-clienttoken');
          try {
            let result = await request.axios_post(
              `https://account.teambition.com/api/login/email`,
              {
                email: email,
                password: pwd,
                response_type: 'token',
                client_id: clientId,
                token: token
              }
            );
            return resolve(result.data.access_token);
          } catch (error) {
            console.log('err 26 teambition', error);
            return reject(error);
          }
        })
        .catch(err => {
          console.log('err 30 teambition', err);
          return reject(err);
        });
    });
  }
};
