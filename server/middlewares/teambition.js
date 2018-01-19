import jsdom from 'jsdom';
import request from './async';
import config from 'config';

export default {
  /**
   * -- {用户后台登录此用户的token} --
   * @param {String} email 邮箱 = 用户名
   * @param {String} pwd 密码
   * @param {Promise} return token
   * @author:ls
   */
  async access_token(email, pwd) {
    const {JSDOM} = jsdom;
    try {
      let dom = await JSDOM.fromURL(`${config.account_api}/login`);
      let document = dom.window.document.getElementById('secrets');
      let clientId = document.getAttribute('data-clientid');
      let token = document.getAttribute('data-clienttoken');
      let result = await request.axios_post(`${config.account_api}/api/login/email`, {
        email: email,
        password: pwd,
        response_type: 'token',
        client_id: clientId,
        token: token
      });
      return result.data ? result.data.access_token : null;
    } catch (error) {
      console.log('error', error);
      return error;
    }
  },
  /**
   * -- {获取企业标签所有} --
   * @param {String} organizationId 企业Id
   * @param {String} token tb用户验证
   * @param {Promise} return 回调函数
   * @author:ls
   */
  async project_tags(organizationId, token) {
    const url = `${config.api}/api/organizations/${organizationId}/projecttags`;
    if (!token) {
      token = await this.access_token(config.account.email, config.account.pwd);
    }
    const result = await request.axios_get(url, token);

    return result;
  },
  //获取企业某标签下的项目
  async project_tag(organizationId, tagId, token) {
    const url = `${config.api}/organizations/${organizationId}/projecttags/${tagId}/projects`;
    if (!token) {
      token = await this.access_token(config.account.email, config.account.pwd);
    }
    const result = await request.axios_get(url, token);
    return result;
  },
  /**
   * -- {获取企业hooks, 如果没有向企业添加webhooks事件} --
   * @param {String} organizationId 企业Id
   * @param {String} token tb用户验证
   * @param {Promise} return 回调函数
   * @author:ls
   */
  async organization_hook(organizationId, token) {
    const url = `${config.api}/organizations/${config.organizationId}/hooks`;
    if (!token) {
      token = await this.access_token(config.account.email, config.account.pwd);
    }
    let result = await request.axios_get(url, token);
    if (result.data.length === 0) {
      return await this.create_org_hook(config.organizationId, token);
    }
    return result;
  },
  /**
   * -- {创建企业hooks} --
   * @param {String} organizationId 企业Id
   * @param {String} token tb用户验证
   * @param {Promise} return 回调函数
   * @author:ls
   */
  async create_org_hook(organizationId, token) {
    const url = `${config.api}/organizations/${config.organizationId}/hooks`;
    if (!token) {
      token = await this.access_token(config.account.email, config.account.pwd);
    }
    let result = await request.axios_postToken(
      url,
      {
        callbackURL: `${config.domain}/api/webhook/callback`,
        events: ['project.create', 'project.remove']
      },
      token
    );
    return result;
  },
  /**
   * -- {删除企业hooks} --
   * @param {String} organizationId 企业Id
   * @param {String} hookId tb 创建hooks Id
   * @param {String} token tb用户验证
   * @param {Promise} return 回调函数
   * @author:ls
   */
  async organization_delete_hook(organizationId, hookId, token) {
    const url = `${config.api}/organizations/${config.organizationId}/hooks/${hookId}`;
    if (!token) {
      token = await this.access_token(config.account.email, config.account.pwd);
    }
    let result = await request.axios_delete(url, token);
    return result;
  },
  /**
   * -- {获取项目是否创建 hooks} --
   * @param {String} projectId 项目Id
   * @param {String} token tb用户验证
   * @param {Promise} return 回调函数
   * @author:ls
   */
  async project_hook(projectId, token) {
    const url = `${config.api}/projects/${projectId}/hooks`;
    if (!token) {
      token = await this.access_token(config.account.email, config.account.pwd);
    }
    let result = await request.axios_get(url, token);
    if (result.data.length === 0) {
      return await this.create_project_hook(projectId, token);
    }
    return result;
  },
  /**
   * -- {创建项目 hooks} --
   * @param {String} project 项目Id
   * @param {String} token tb用户验证
   * @param {Promise} return 回调函数
   * @author:ls
   */
  async create_project_hook(projectId, token) {
    const url = `${config.api}/projects/${projectId}/hooks`;
    if (!token) {
      token = await this.access_token(config.account.email, config.account.pwd);
    }
    const event = [
      'project.rename',
      'project.archive',
      'project.unarchive',
      'project.member.create',
      'project.member.remove',
      'tasklist.create',
      'tasklist.remove',
      'tasklist.rename',
      'task.create',
      'task.update',
      'task.remove',
      'task.fork',
      'task.update.executor',
      'task.update.dueDate',
      'task.update.priority',
      'task.update.note',
      'task.update.involveMembers',
      'task.update.customfields',
      'task.update.storyPoint',
      'task.update.workTime.totalTime',
      'task.update.workTime.usedTime',
      'task.update.progress',
      'task.update.rating',
      'task.rename',
      'task.move',
      'task.done',
      'task.archive',
      'task.unarchive',
      'stage.create',
      'stage.rename'
    ];
    const result = await request.axios_postToken(
      url,
      {
        callbackURL: `${config.domain}/api/webhook/callback`,
        events: event
      },
      token
    );
    return result;
  },
  /**
   * -- {删除项目hook} --
   * @param {String} projectId 项目Id
   * @param {String} hookId 项目hookId
   * @param {String} token tb用户验证
   * @return {Promise} 回调函数
   * @author:ls
   */
  async delete_project_hook(projectId, hookId, token) {
    const url = `${config.api}/projects/${projectId}/hooks/${token}`;
    if (!token) {
      token = await this.access_token(config.account.email, config.account.pwd);
    }
    let result = await request.axios_delete(url, token);
    return result;
  },
  /**
   * -- {获取项目下任务分组} --
   * @param {String} projectId 项目Id
   * @param {String} token tb用户验证
   * @return {Promise} 回调函数
   * @author:ls
   */
  async task_lists(projectId, token) {
    const url = `${config.api}/projects/${projectId}/tasklists`;
    if (!token) {
      token = await this.access_token(config.account.email, config.account.pwd);
    }
    let result = await request.axios_get(url, token);
    return result;
  },
  /**
   * -- {获取任务分组下的任务列表} --
   * @param {String} taskListId 分组Id
   * @param {String} token tb用户验证
   * @return {Promise} 回调函数
   * @author:ls
   */
  async task_lists_stages(taskListId, token) {
    const url = `${config.api}/tasklists/${taskListId}/stages`;
    if (!token) {
      token = await this.access_token(config.account.email, config.account.pwd);
    }
    let result = await request.axios_get(url, token);
    return result;
  },
  /**
   * -- {获取任务} --
   * @param {String} projectId 项目Id
   * @param {String} token tb用户验证
   * @return {Promise} 回调函数
   * @author:ls
   */
  async project_task(projectId, token, isDone) {
    const url = `${config.api}/api/projects/${projectId}/tasks?isDone=${isDone}`;
    if (!token) {
      token = await this.access_token(config.account.email, config.account.pwd);
    }
    let result = await request.axios_get(url, token);
    return result;
  },
  /**
   * -- {获取任务列表下的所有任务} --
   * @param {String} stageId 列表id
   * @param {String} token tb用户验证
   * @return {Promise} 回调函数
   * @author:ls
   */
  async stages_tasks(stageId, token) {
    const url = `${config.api}/stages/${stageId}/tasks?count=${100}&page=${1}`;
    if (!token) {
      token = await this.access_token(config.account.email, config.account.pwd);
    }
    let result = await request.axios_get(url, token);
    return result;
  }
};
