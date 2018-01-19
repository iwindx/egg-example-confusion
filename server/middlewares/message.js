import config from 'config';
import crypto from 'crypto';
import request from '../middlewares/async';
import schedule from 'node-schedule';
import {Task, Project} from '../schemas/models';
import moment from 'moment';
export default {
  init() {
    schedule.scheduleJob('* * 0 * * *', async () => {
      let tasks = await Task.find({
        dueDate: {
          $gte: new Date(moment().format('YYYY-MM-DD 00:00:00')),
          $lte: new Date(moment().format('YYYY-MM-DD 23:59:59'))
        }
      }).exec();
      for (let task of tasks) {
        let job = schedule.scheduleJob(new Date(task.dueDate), async () => {
          let project = await Project.findOne({_id: task._projectId}).exec();

          const str = `${project.name} - ${task.stage.name} - ${task.content}`;
          this.sendMessage(str);
          job.cancel();
        });
      }
    });
  },
  async sendMessage(text) {
    try {
      const no = config.iLand.eid;
      const pub = config.iLand.pub;
      const pubsecret = config.iLand.pubsecret;
      const pubUrl = config.iLand.url;
      const time = new Date().getTime();
      const nonce = Math.round(Math.random() * 1000000);

      const arr = [no, pub, pubsecret, nonce, time].sort();

      const arrStr = arr.join('');
      const sha = crypto.createHash('sha1');
      sha.update(arrStr);
      const pubtoken = sha.digest('hex');

      const from = {no, pub, time, nonce, pubtoken};

      const to = [{no: no, code: 'all'}];

      const data = {from, to, type: 2, msg: {text: text}};
      const result = await request.axios_post(pubUrl, data);
      console.log('result', result);
    } catch (error) {
      console.log('error', error);
    }
  }
};
