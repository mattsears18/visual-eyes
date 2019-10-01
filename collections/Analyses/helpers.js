import Jobs from '../Jobs/Jobs';

import allVisitsCreated from './imports/allVisitsCreated';
import allVisitsProcessed from './imports/allVisitsProcessed';
import filterFixationsByDuration from './imports/filterFixationsByDuration';
import getExportData from './imports/getExportData';
import getVisitEndIndex from './imports/getVisitEndIndex';
import getVisitFixationCount from './imports/getVisitFixationCount';
import getVisitAoiIds from './imports/getVisitAoiIds';
import makeVisitJobsJob from './imports/makeVisitJobsJob';
import makeVisits from './imports/makeVisits';
import saveCSV from './imports/saveCSV';
import updateStatus from './imports/updateStatus';

Analyses.helpers({
  allVisitsCreated,
  allVisitsProcessed,
  filterFixationsByDuration,
  getExportData,
  getVisitEndIndex,
  getVisitFixationCount,
  getVisitAoiIds,
  makeVisitJobsJob,
  makeVisits,
  saveCSV,
  updateStatus,

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
  visits() {
    return Visits.find({ analysisId: this._id });
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
