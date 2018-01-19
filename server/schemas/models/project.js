import mongoose from 'mongoose';
const scheme = new mongoose.Schema({
  // 项目名称
  name: {type: String},
  // 企业id
  _organizationId: {type: String},
  // 更新时间
  updated: {type: Date, default: Date.now},
  // 创建时间
  created: {type: Date, default: Date.now}
});
scheme.index({name: 1});

export default mongoose.model('project', scheme);
