import {Task, Stage, Project} from '../schemas/models';
import _ from 'lodash';

export default {
  /**
   * -- {创建任务} --
   * callback:
   * - err, 数据库异常
   * - result, 操作结果
   * @param {Object} tb task info
   * @param {object} tb task.create events data
   * @author:ls
   */
  taskCreate(task, data) {
    let taskData = new Task(task.data);
    taskData.save();
  },
  /**
   * -- {完成任务} --
   * callback:
   * - err, 数据库异常
   * - result, 操作结果
   * @param {Object}  tb task.create events data
   * @author:ls
   */
  taskDone(data) {
    const {task} = data;
    Task.update(
      {_id: task._id},
      {
        isDone: task.isDone,
        updated: new Date()
      }
    ).exec();
  },
  /**
   * -- {更新截止时间} --
   * callback:
   * - err, 数据库异常
   * - result, 操作结果
   * @param {Object}  tb task.create events data
   * @author:ls
   */
  taskDueDate(tbTask, data) {
    const {task} = data;
    console.log('tbTask', tbTask);
    Task.update(
      {
        _id: task._id
      },
      {
        startDate: tbTask.dueDate,
        dueDate: task.dueDate,
        updated: new Date()
      }
    ).exec();
  },
  /**
   * -- {更新任务备注} --
   * callback:
   * - err, 数据库异常
   * - result, 操作结果
   * @param {Object}  tb task.create events data
   * @author:ls
   */
  taskNote(data) {
    const {task} = data;
    Task.update(
      {
        _id: task._id
      },
      {
        note: task.note,
        updated: new Date()
      }
    ).exec();
  },
  /**
   * -- {更新任务紧急度} --
   * callback:
   * - err, 数据库异常
   * - result, 操作结果
   * @param {Object}  tb task.create events data
   * @author:ls
   */
  taskPriority(data) {
    const {task} = data;
    Task.update(
      {
        _id: task._id
      },
      {
        priority: task.priority,
        updated: new Date()
      }
    ).exec();
  },
  /**
   * -- {更新任务标题} --
   * callback:
   * - err, 数据库异常
   * - result, 操作结果
   * @param {Object}  tb task.create events data
   * @author:ls
   */
  taskRename(data) {
    const {task} = data;
    Task.update(
      {
        _id: task._id
      },
      {
        content: task.content,
        updated: new Date()
      }
    ).exec();
  },
  /**
   * -- {删除任务} --
   * callback:
   * - err, 数据库异常
   * - result, 操作结果
   * @param {Object}  tb task.create events data
   * @author:ls
   */
  taskRemove(data) {
    const {task} = data;
    Task.update(
      {_id: task._id},
      {
        isDeleted: true,
        updated: new Date()
      }
    ).exec();
  },
  /**
   * -- {移动任务} --
   * callback:
   * - err, 数据库异常
   * - result, 操作结果
   * @param {Object}  tb task.create events data
   * @author:ls
   */
  taskMove(data) {
    const {task, project, stage, tasklist} = data;
    Task.update(
      {
        _id: task._id
      },
      {
        $set: {_projectId: project._id, stage, tasklist}
      }
    ).exec();
  },
  /**
   * -- {归档任务 或 取消归档} --
   * callback:
   * - err, 数据库异常
   * - result, 操作结果
   * @param {Object}  tb task.create events data
   * @author:ls
   */
  taskArchive(data, bool) {
    const {task} = data;
    Task.update(
      {_id: task._id},
      {
        $set: {isArchived: bool}
      }
    ).exec();
  },
  /**
   * -- {创建项目} --
   * callback:
   * - err, 数据库异常
   * - result, 操作结果
   * @param {Object}  tbProject  project info
   * @param {Object}  tb project.create events data
   * @author:ls
   */
  projectCreate(data) {
    const {project} = data;
    const result = new Project(project);
    result.save();
  },
  /**
   * -- {修改项目} --
   * callback:
   * - err, 数据库异常
   * - result, 操作结果
   * @param {Object}  tb project.create events data
   * @author:ls
   */
  projectRename(data) {
    const {project} = data;
    Project.update(
      {_id: project._id},
      {
        $set: {name: project.name}
      }
    ).exec();
  },
  projectRemove(data) {
    const {project} = data;
    Project.remove({_id: project._id}).exec();
    Task.remove({_projectId: project._id}).exec();
  },
  /**
   * -- {修改任务列表 或 添加任务列表} --
   * callback:
   * - err, 数据库异常
   * - result, 操作结果
   * @param {Object}  tb task.create events data
   * @author:ls
   */
  stage(data) {
    let {stage, project} = data;
    stage.projectId = project._id;
    stage.projectName = project.name;
    stage.updated = new Date();
    stage.created = new Date();
    Task.update(
      {'stage._id': stage._id},
      {
        $set: stage
      },
      {multi: true}
    ).exe();
    Stage.update(
      {_id: stage._id},
      {
        $set: stage
      },
      {upsert: true}
    ).exec();
  }
};
