import webhooks from '../middlewares/webhooks';
import request from '../middlewares/async';
import teambition from '../middlewares/teambition';
import config from 'config';
import hook from '../middlewares/hook';

export default {
  async eventCallBack(ctx, next) {
    const {body} = ctx.request;
    console.log('body', body);
    try {
      const token = await teambition.access_token(config.account.email, config.account.pwd);
      let task, project;
      const pat = /task/;
      const patRemove = /task.remove/;
      const patProject = /project/;
      if (pat.test(body.event) && !patRemove.test(body.event)) {
        task = await request.axios_get(`${config.api}/tasks/${body.data.task._id}`, token);
      }
      switch (body.event) {
        case 'task.create':
          return webhooks.taskCreate(task, body.data);
        case 'task.done':
          return webhooks.taskDone(body.data);
        case 'task.update.dueDate':
          return webhooks.taskDueDate(task, body.data);
        case 'task.remove':
          return webhooks.taskRemove(body.data);
        case 'task.update.rename':
          return webhooks.taskRename(body.data);
        case 'task.update.priority':
          return webhooks.taskPriority(body.data);
        case 'task.update.note':
          return webhooks.taskNote(body.data);
        case 'task.move':
          return webhooks.taskMove(body.data);
        case 'task.archive':
          return webhooks.taskArchive(body.data, true);
        case 'stage.create':
          return webhooks.stage(body.data);
        case 'stage.rename':
          return webhooks.stage(body.data);
        case 'project.rename':
          return webhooks.projectRename(body.data);
        case 'project.create':
          webhooks.projectCreate(body.data);
          const token = await teambition.access_token(config.account.email, config.account.pwd);
          return await teambition.create_project_hook(body.data.project._id, token);
        case 'project.remove':
          return webhooks.projectRemove(body.data);
        default:
          break;
      }
    } catch (error) {
      console.log('error', error);
    }
  }
};
