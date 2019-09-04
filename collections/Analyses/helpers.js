import Jobs from '../Jobs/Jobs';
import filterFixationsByDuration from './imports/filterFixationsByDuration';
import getVisitEndIndex from './imports/getVisitEndIndex';
import getVisitFixationCount from './imports/getVisitFixationCount';
import getVisitAoiIds from './imports/getVisitAoiIds';
import makeVisit from './imports/makeVisit';
import makeVisits from './imports/makeVisits';
import makeVisitJobsJob from './imports/makeVisitJobsJob';
import updateStatus from './imports/updateStatus';
import getExportData from './imports/getExportData';
import getType from './imports/getType';
import saveCSV from './imports/saveCSV';
import allVisitsCreated from './imports/allVisitsCreated';
import allVisitsProcessed from './imports/allVisitsProcessed';

Analyses.helpers({
  filterFixationsByDuration,
  getVisitEndIndex,
  getVisitFixationCount,
  getVisitAoiIds,
  makeVisit,
  makeVisits,
  makeVisitJobsJob,
  updateStatus,
  getExportData,
  saveCSV,
  allVisitsCreated,
  allVisitsProcessed,
  getType,

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
  typeText() {
    if (this.type) {
      if (this.type === 'iso15007') {
        return 'ISO 15007';
      }
      return 'Custom';
    }
  },
});
