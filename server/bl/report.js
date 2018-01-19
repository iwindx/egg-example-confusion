import teambition from '../middlewares/teambition';
import config from 'config';
import reportDal from '../dal/report_dal';

export default {
  async count(ctx, next) {
    try {
      const {token} = ctx.request.headers;
      let tags = await teambition.project_tag(config.organizationId, config.projecttags._id, token);
      const projectIds = tags.data.map(val => val._id);

      return (ctx.body = await reportDal.count(projectIds));
    } catch (error) {
      return next(error);
    }
  },
  async info(ctx, next) {
    try {
      const {token} = ctx.request.headers;
      const {projectId} = ctx.query;
      return (ctx.body = await reportDal.info(projectId));
    } catch (error) {
      return next(error);
    }
  }
};
