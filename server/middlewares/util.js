import sha1 from 'sha1';
import xml2js from 'xml2js';
import querystring from 'querystring';

export default {
  checkSignature(req) {
    // 获取校验参数
    const {signature, timestamp, nonce} = req.query;
  
    // 此处为实验分配了一个 token，也可以修改为自己的 token
    const token = 'ls1997';
  
    // 按照字典排序
    const params = [token, timestamp, nonce].sort();

    // 连接
    const str = sha1(params.join(""));
  
    // 返回签名是否一致
    return str === signature;
  }
}