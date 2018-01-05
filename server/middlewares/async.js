import axios from 'axios';

export default {
 /**
  * -- {带token的get请求} --
  * callback:
  * - err, 数据库异常
  * - result, 操作结果
  * @param {String}  url 访问地址
  * @param {String}  token Teambition唯一验证码
  * @param {async} Promise 回调函数
  * @author:ls
  */
  axios_get(url, token) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: url,
        timeout: 60000,
        headers: { Authorization: `OAuth2 ${token}` }
      })
        .then(res => {
          return resolve(res);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
 /**
  * -- {post请求} --
  * callback:
  * - err, 数据库异常
  * - result, 操作结果
  * @param {String}  url 访问地址
  * @param {object}  data 传输数据
  * @param {async} Promise 回调函数
  * @author:ls
  */
  axios_post(url, data) {
    return new Promise((resolve, reject) => {
      axios(url, {
        method: 'post',
        url: url,
        timeout: 60000,
        data: data
      })
        .then(res => {
          return resolve(res);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
 /**
  * -- {带token的post请求} --
  * callback:
  * - err, 数据库异常
  * - result, 操作结果
  * @param {String}  url 访问地址
  * @param {object}  data 传输数据
  * @param {String}  token Teambition唯一验证码
  * @param {async} Promise 回调函数
  * @author:ls
  */
  axios_postToken(url, data, token) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        data: data,
        timeout: 60000,
        headers: { Authorization: `OAuth2 ${token}` }
      })
        .then(res => {
          return resolve(res);
        })
        .catch(err => {
          return reject(err);
        });
    });
  },
 /**
  * -- {有头部的post请求} --
  * callback:
  * - err, 数据库异常
  * - result, 操作结果
  * @param {String}  url 访问地址
  * @param {Object}  headers 发送头部 
  * @param {object}  data 传输数据
  * @param {async} Promise 回调函数
  * @author:ls
  */
  axios_head_post(url, headers, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: url,
        timeout: 60000,
        headers,
        data
      })
        .then(res => {
          return resolve(res);
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
};
