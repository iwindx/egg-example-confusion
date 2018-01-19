import mongoose from 'mongoose';
const scheme = new mongoose.Schema({
  // 项目id
  _projectId: {type: String},
  // 任务id
  _taskId: {type: String},
  // 任务分组id
  tasklist: {
    // 分组id
    _id: {type: String},
    // 分组名称
    title: {type: String}
  },
  // 执行者id
  executor: {
    // 执行者id
    _id: {type: String},
    // 执行者名称
    name: {type: String},
    // 执行者头像
    avatarUrl: {type: String}
  },
  // 创建者id
  _creatorId: {type: String},
  // 是否删除
  isDeleted: {type: Boolean, default: false},
  // 是否完成
  isDone: {type: Boolean, default: false},
  // 是否归档
  isArchived: {type: Boolean, default: false},
  // 任务紧急度 normal = 普通 ， high = 紧急， urgent = 非常紧急
  priority: {type: String},
  // 父任务id
  ancestorIds: [{type: String}],
  // 任务列表
  stage: {
    // 列表id
    _id: {type: String},
    // 列表名称
    name: {type: String}
  },
  // 任务结束时间
  dueDate: {type: Date},
  // 任务开始时间
  startDate: {type: Date},
  // 备注
  note: {type: String},
  // 任务标题
  content: {type: String},
  // 更新时间
  updated: {type: Date},
  // 创建时间
  created: {type: Date}
});
scheme.index({taskId: 1});

export default mongoose.model('task', scheme);
