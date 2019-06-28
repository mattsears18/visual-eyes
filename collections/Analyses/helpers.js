import Jobs from '../Jobs/Jobs';
import getGazeEndIndex from './imports/getGazeEndIndex';
import makeGazeJobs from './imports/makeGazeJobs';
import getGazeFixationCount from './imports/getGazeFixationCount';
import getGazeAoiIds from './imports/getGazeAoiIds';
import makeGazeFromGazepoints from './imports/makeGazeFromGazepoints';
import makeGazes from './imports/makeGazes';
import updateStatus from './imports/updateStatus';
import getExportData from './imports/getExportData';
import saveCSV from './imports/saveCSV';
import allGazesCreated from './imports/allGazesCreated';
import allGazesProcessed from './imports/allGazesProcessed';

Analyses.helpers({
  getGazeEndIndex,
  makeGazeJobs,
  getGazeFixationCount,
  getGazeAoiIds,
  makeGazeFromGazepoints,
  makeGazes,
  updateStatus,
  getExportData,
  saveCSV,
  allGazesCreated,
  allGazesProcessed,

  hasPermission(action) {
    check(action, String);

    if (this.userPermissions) {
      userIds = this.userPermissions[action];
      if (userIds) {
        return userIds.includes(Meteor.userId());
      }
    }
    return false;
  },
  study() {
    return this.studyId ? Studies.findOne({ _id: this.studyId }) : undefined;
  },
  stimuli() {
    return this.stimulusIds
      ? Stimuli.find({ _id: { $in: this.stimulusIds } })
      : undefined;
  },
  participants() {
    return this.participantIds
      ? Participants.find({ _id: { $in: this.participantIds } })
      : undefined;
  },
  gazes() {
    return Gazes.find({ analysisId: this._id });
  },
  jobs(search) {
    return Jobs.find({ 'data.analysisId': this._id, ...search });
  },
  jobsCount(search) {
    return this.jobs(search).count();
  },
  jobsCompleted() {
    return Jobs.find({ 'data.analysisId': this._id, status: 'completed' });
  },
  jobsCompletedCount() {
    return this.jobsCompleted().count();
  },
  jobsProgress() {
    let progress = 0;
    if (this.jobsCount()) {
      progress = (this.jobsCompletedCount() / this.jobsCount()) * 100;
    }
    return progress;
  },
  allJobsCompleted() {
    return this.jobsCount() === this.jobsCompletedCount();
  }
});
