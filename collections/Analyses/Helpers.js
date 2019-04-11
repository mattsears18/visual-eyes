import Jobs                       from '../Jobs/Jobs';
import removeViewingsAndJobs      from './helpers/removeViewingAndJobs';
import getViewingEndIndex         from './helpers/getViewingEndIndex';
import makeViewingJobs            from './helpers/makeViewingJobs';
import getViewingFixationCount    from './helpers/getViewingFixationCount';
import getViewingAoiIds           from './helpers/getViewingAoiIds';
import makeViewingFromGazepoints  from './helpers/makeViewingFromGazepoints';
import makeViewings               from './helpers/makeViewings';
import updateStatus               from './helpers/updateStatus';
import getDataAsCSV               from './helpers/getDataAsCSV';
import getViewingsDataAsCSV       from './helpers/getViewingsDataAsCSV';

Analyses.helpers({
  removeViewingsAndJobs,
  getViewingEndIndex,
  makeViewingJobs,
  getViewingFixationCount,
  getViewingAoiIds,
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
