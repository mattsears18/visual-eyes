import Jobs                       from '../Jobs/Jobs';
import removeViewingsAndJobs      from './imports/removeViewingAndJobs';
import getViewingEndIndex         from './imports/getViewingEndIndex';
import makeViewingJobs            from './imports/makeViewingJobs';
import getViewingFixationCount    from './imports/getViewingFixationCount';
import getViewingAoiIds           from './imports/getViewingAoiIds';
import normalizeGazepoints        from './imports/normalizeGazepoints';
import makeViewingFromGazepoints  from './imports/makeViewingFromGazepoints';
import makeViewings               from './imports/makeViewings';
import updateStatus               from './imports/updateStatus';
import getDataAsCSV               from './imports/getDataAsCSV';
import getViewingsDataAsCSV       from './imports/getViewingsDataAsCSV';

Analyses.helpers({
  removeViewingsAndJobs,
  getViewingEndIndex,
  makeViewingJobs,
  getViewingFixationCount,
  getViewingAoiIds,
  normalizeGazepoints,
  makeViewingFromGazepoints,
  makeViewings,
  updateStatus,
  getDataAsCSV,
  getViewingsDataAsCSV,

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
  jobs() {
    return Jobs.find({ 'data.analysisId': this._id });
  },
  jobsCount() {
    return this.jobs().count();
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
