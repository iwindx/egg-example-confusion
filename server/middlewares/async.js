import axios from 'axios'

export default {
  /**
   * -- {get请求} --
   * @param {String}  url 访问地址
   * @param {String}  token Teambition唯一验证码
   * @returns {http}  promise
   * @author:ls
   */
  async axios_get(url, token) {
    return await axios({
      method: 'get',
      url: url,
      headers: { Authorization: `OAuth2 ${token}` }
    })
  },
  /**
   * -- {delete请求} --
   * @param {String}  url 访问地址
   * @param {String}  token Teambition唯一验证码
   * @returns {http}  promise
   * @author:ls
   */
  async axios_delete(url, token) {
    return await axios({
      method: 'delete',
      url: url,
      headers: { Authorization: `OAuth2 ${token}` }
    })
  },
  /**
   * -- {post请求} --
   * @param {String}  url 访问地址
   * @param {object}  data 传输数据
   * @param {String}  token Teambition唯一验证码
   * @returns {http}  promise
   * @author:ls
   */
  async axios_post(url, data, token) {
    return await axios({
      method: 'post',
      url: url,
      data: data,
      headers: { Authorization: `OAuth2 ${token}` }
    })
  },
  /**
   * -- {put请求} --
   * @param {String}  url 访问地址
   * @param {Object}  data 发送头部
   * @param {String}  token Teambition唯一验证码
   * @returns {http}  promise
   * @author:ls
   */
  async axios_put(url, data, token) {
    return await axios({
      method: 'put',
      url: url,
      data: data,
      headers: { Authorization: `OAuth2 ${token}` }
    })
  }
}
