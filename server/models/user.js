import mongoose from 'mongoose'

const UserScheme = new mongoose.Schema({
  // _id = userId = TB - _userId
  // 组织id
  _boundToObjectId: { type: String },
  // 组织类别
  boundToObjectType: { type: String },
  // 邮箱
  email: { type: String },
  // 用户名
  name: { type: String },
  // 头像地址
  avatarUrl: { type: String },
  // 是否激活
  isActive: { type: String },
  // 手机号码
  phone: { type: String },
  // 职位
  title: { type: String },
  // 拼音
  pinyin: { type: String },
  // py简写
  py: { type: String },
  // 团队列表
  teams: [{ type: String }],
  // 更新时间
  updateAt: { type: Date, default: Date.now() },
  // 创建时间
  createAt: { type: Date, default: Date.now() }
})

export default mongoose.model('User', UserScheme);

