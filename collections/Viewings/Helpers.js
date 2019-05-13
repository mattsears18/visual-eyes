import Jobs from '../Jobs/Jobs';
import getHullseries from './imports/getHullseries';
import saveCSV from './imports/saveCSV';

Viewings.helpers({
  getHullseries,
  saveCSV,

  hasPermission(action) {
    check(action, String);

    if (this.userPermissions) {
      const userIds = this.userPermissions[action];
      if (userIds) {
        return userIds.includes(Meteor.userId());
      }
    }
    return false;
  },
  datafile() {
    return Datafiles.findOne(this.datafileId);
  },
  datafileName() {
    return this.datafile() ? this.datafile().name : undefined;
  },
  participant() {
    return Participants.findOne(this.participantId);
  },
  participantName() {
    return this.participant() ? this.participant().name : undefined;
  },
  stimulus() {
    return Stimuli.findOne(this.stimulusId);
  },
  stimulusArea() {
    return this.stimulus().area();
  },
  stimulusName() {
    return this.stimulus() ? this.stimulus().name : undefined;
  },
  study() {
    return Studies.findOne({ _id: this.studyId });
  },
  analysis() {
    return Analyses.findOne(this.analysisId);
  },
  aois() {
    if (this.aoiIds && this.aoiIds.length) {
      return Aois.find({ _id: { $in: this.aoiIds } }, { sort: { name: 1 } });
    }
    return undefined;
  },
  jobs() {
    return Jobs.find({ 'data.viewingId': this._id });
  },
  jobsCompleted() {
    return Jobs.find({ 'data.viewingId': this._id, status: 'completed' });
  },
  jobsProgress() {
    let progress = 0;
    if (this.jobs().count()) {
      progress = (this.jobsCompleted().count() / this.jobs().count()) * 100;
    }
    return progress;
  },
  allJobsCompleted() {
    return this.jobs().count() === this.jobsCompleted().count();
  },
});
