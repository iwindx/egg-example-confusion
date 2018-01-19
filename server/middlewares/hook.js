import request from '../middlewares/async';
import config from 'config';
import teambition from '../middlewares/teambition';
import _ from 'lodash';

export default {
  async createHook() {
    try {
      // 获取token
      const token = await teambition.access_token(config.account.email, config.account.pwd);
      console.log('token', token);
      const orgHook = await teambition.organization_hook(config.organizationId, token);

      // // 删除企业的webhooks 测试用
      // const deleteHook =  await teambition.organization_delete_hook(config.organizationId, orgHook.data[0]._id, token);
      // console.log('deleteHook', deleteHook)

      // 企业项目标签
      const projectTags = await teambition.project_tags(config.organizationId, token);
      // 法律减压部项目标签
      let lawTag = await teambition.project_tag(
        config.organizationId,
        config.projecttags._id,
        token
      );
      lawTag = lawTag.data.map(val => val._id);
      // 减压部所有项目id
      for (let projectId of lawTag) {
        // 获取项目的hooks
        const projectHook = await teambition.project_hook(projectId, token);
        // // 删除项目webhooks 测试用
        // const delete_project_hook = await teambition.delete_project_hook(
        //   projectId,
        //   projectHook.data[0]._id,
        //   token
        // );
        // console.log('delete_project_hook', delete_project_hook)
      }
    } catch (error) {
      console.log('error', error);
    }
  }
};
