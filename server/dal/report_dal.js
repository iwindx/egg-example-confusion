import {Project, Task, Stage} from '../schemas/models';
import {filter, every, some} from 'lodash';
import moment from 'moment';

export default {
  async count(projectIds) {
    try {
      let arr = [];
      const projects = await Project.find({
        _id: {
          $in: projectIds
        }
      })
        .select('name')
        .exec();

      for (const project of projects) {
        const str = '_projectId  isDone startDate dueDate isDeleted content';
        const stages = await Stage.find({
          projectId: project._id
        }).exec();
        let doneCount = 0,
          underCount = 0,
          overdueCount = 0;
        for (const stage of stages) {
          let tasks = await Task.find({
            _projectId: project._id,
            'stage._id': stage._id
          })
            .select(str)
            .exec();
          const doneBool = every(tasks, {
            isDone: true
          });
          if (doneBool) {
            tasks.length > 0 ? (doneCount += 1) : null;
          }
          const undoneCount = filter(tasks, {
            isDone: false
          });

          const underBool = every(undoneCount, task => {
            const isBefore = moment().isBefore(task.dueDate);
            return isBefore || !task.dueDate ? true : false;
          });
          if (underBool) {
            undoneCount.length > 0 ? (underCount += 1) : null;
          }
          const overdueBool = some(undoneCount, task => {
            const isBefore = moment(task.dueDate).isBefore(moment());
            return isBefore;
          });
          if (overdueBool) {
            undoneCount.length > 0 ? (overdueCount += 1) : null;
          }
        }
        arr.push({
          projectName: project.name,
          projectId: project._id,
          handler: {
            doneCount,
            underCount,
            overdueCount
          }
        });
      }
      return arr;
    } catch (error) {
      return error;
    }
  },
  async info(projectId) {
    try {
      const project = await Project.findOne({
        _id: projectId
      })
        .select('name')
        .exec();
      const str = '_projectId  isDone startDate dueDate isDeleted content tasklist';
      const stages = await Stage.find({
        projectId: project._id
      }).exec();
      console.log('stages', stages);
      let doneCount = [],
        underCount = [],
        overdueCount = [];
      for (const stage of stages) {
        let tasks = await Task.find({
          _projectId: project._id,
          'stage._id': stage._id
        })
          .select(str)
          .exec();
        const doneBool = every(tasks, {
          isDone: true
        });
        if (doneBool) {
          tasks.length > 0 ? doneCount.push(stage) : null;
        }
        const undoneCount = filter(tasks, {
          isDone: false
        });

        const underBool = every(undoneCount, task => {
          const isBefore = moment().isBefore(task.dueDate);
          return isBefore || !task.dueDate ? true : false;
        });
        if (underBool) {
          undoneCount.length > 0 ? underCount.push(stage) : null;
        }
        const overdueBool = some(undoneCount, task => {
          const isBefore = moment(task.dueDate).isBefore(moment());
          return isBefore;
        });
        if (overdueBool) {
          undoneCount.length > 0 ? overdueCount.push(stage) : null;
        }
      }
      return {
        projectName: project.name,
        projectId: project._id,
        handler: {
          doneCount,
          underCount,
          overdueCount
        }
      };
    } catch (error) {
      return error;
    }
  }
};
