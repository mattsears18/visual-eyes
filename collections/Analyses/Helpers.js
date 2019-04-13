import Jobs                       from '../Jobs/Jobs';
import getViewingEndIndex         from './imports/getViewingEndIndex';
import makeViewingJobs            from './imports/makeViewingJobs';
import getViewingFixationCount    from './imports/getViewingFixationCount';
import getViewingAoiIds           from './imports/getViewingAoiIds';
import makeViewingFromGazepoints  from './imports/makeViewingFromGazepoints';
import makeViewings               from './imports/makeViewings';
import updateStatus               from './imports/updateStatus';
import getDataAsCSV               from './imports/getDataAsCSV';
import getViewingsDataAsCSV       from './imports/getViewingsDataAsCSV';
import allViewingsCreated         from './imports/allViewingsCreated';
import allViewingsProcessed       from './imports/allViewingsProcessed';

Analyses.helpers({
  getViewingEndIndex,
  makeViewingJobs,
  getViewingFixationCount,
  getViewingAoiIds,
  makeViewingFromGazepoints,
  makeViewings,
  updateStatus,
  getDataAsCSV,
  getViewingsDataAsCSV,
  allViewingsCreated,
  allViewingsProcessed,

  hasPermission(action) {
    check(action, String);

    if(this.userPermissions) {
      userIds = this.userPermissions[action];
      if(userIds) {
        return userIds.includes(Meteor.userId());
      }
    }
    return false;
  },
  study() {
    return Studies.findOne({ _id: this.studyId });
  },
  stimuli() {
    return Stimuli.find({ _id: { $in: this.stimulusIds }});
  },
  participants() {
    return Participants.find({ _id: { $in: this.participantIds }});
  },
  viewings() {
    return Viewings.find({ analysisId: this._id });
  },
  jobs(search) {
    return Jobs.find({ 'data.analysisId': this._id, ...search });
  },
  jobsCount(search) {
    return this.jobs(search).count();
  },
  jobsCompleted() {
    return Jobs.find({ 'data.analysisId': this._id, 'status': 'completed' });
  },
  jobsCompletedCount() {
    return this.jobsCompleted().count();
  },
  jobsProgress() {
    let progress = 0;
    if(this.jobsCount()) {
      progress = (this.jobsCompletedCount() / this.jobsCount() * 100);
    }
    return progress;
  },
  allJobsCompleted() {
    return (this.jobsCount() == this.jobsCompletedCount());
  },
});
