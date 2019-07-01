import Jobs from '../Jobs/Jobs';
import getGlanceEndIndex from './imports/getGlanceEndIndex';
import getGlanceFixationCount from './imports/getGlanceFixationCount';
import getGlanceAoiIds from './imports/getGlanceAoiIds';
import makeGlanceFromGazepoints from './imports/makeGlanceFromGazepoints';
import makeGlances from './imports/makeGlances';
import updateStatus from './imports/updateStatus';
import getExportData from './imports/getExportData';
import saveCSV from './imports/saveCSV';
import allGlancesCreated from './imports/allGlancesCreated';
import allGlancesProcessed from './imports/allGlancesProcessed';

Analyses.helpers({
  getGlanceEndIndex,
  getGlanceFixationCount,
  getGlanceAoiIds,
  makeGlanceFromGazepoints,
  makeGlances,
  updateStatus,
  getExportData,
  saveCSV,
  allGlancesCreated,
  allGlancesProcessed,

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
  glances() {
    return Glances.find({ analysisId: this._id });
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
  },
});
