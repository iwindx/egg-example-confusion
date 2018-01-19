import mongoose from 'mongoose';
const scheme = new mongoose.Schema({
  // 项目id
  projectId: {type: String},
  // 项目名字
  projectName: {type: String},
  // 任务列表名称
  name: {type: String},
  // 任务分组id
  tasklistId: {type: String},
  // 更新时间
  updated: {type: Date, default: Date.now},
  // 创建时间
  created: {type: Date, default: Date.now}
});

export default mongoose.model('stage', scheme);
