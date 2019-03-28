import Analyses from './Analyses';
import Jobs from '../Jobs/Jobs';
import getDataAsCSV from './getDataAsCSV';
import getViewingsDataAsCSV from './getViewingsDataAsCSV';

Analyses.helpers({
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
  viewingJobsCount() {
    return Jobs.find({
      type: { $in: ['analyses.makeViewings', 'viewings.saveAverageSlideHullCoverage'] },
      'data.analysisId': this._id,
    }).count();
  },
  viewingJobsCompletedCount() {
    return Jobs.find({
      type: { $in: ['analyses.makeViewings', 'viewings.saveAverageSlideHullCoverage'] },
      'data.analysisId': this._id,
      'status': 'completed',
    }).count();
  },
  viewingsProgress() {
    progress = 0;

    if(this.viewingJobsCount() && this.viewingJobsCompletedCount) {
      progress = this.viewingJobsCompletedCount() / this.viewingJobsCount() * 100;
    }

    return progress;
  },
  viewingsComplete() {
    return this.viewingsProgress() == 100;
  },
  getDataAsCSV,
  getViewingsDataAsCSV,
});
