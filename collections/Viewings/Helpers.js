import Jobs from '../Jobs/Jobs';
import getHullseries from './imports/getHullseries';
import getExportData from './imports/getExportData';
import saveCSV from './imports/saveCSV';
import getSampledData from './imports/getSampledData';
import getFixationProportion from './imports/getFixationProportion';

Viewings.helpers({
  getHullseries,
  getExportData,
  saveCSV,
  getSampledData,
  getFixationProportion,

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
    return this.datafileId ? Datafiles.findOne(this.datafileId) : undefined;
  },
  datafileName() {
    return this.datafile() ? this.datafile().name : undefined;
  },
  participant() {
    return this.participantId
      ? Participants.findOne(this.participantId)
      : undefined;
  },
  participantName() {
    return this.participant() ? this.participant().name : undefined;
  },
  stimulus() {
    return this.stimulusId ? Stimuli.findOne(this.stimulusId) : undefined;
  },
  stimulusArea() {
    return this.stimulus() ? this.stimulus().area() : undefined;
  },
  stimulusName() {
    return this.stimulus() ? this.stimulus().name : undefined;
  },
  study() {
    return this.studyId ? Studies.findOne({ _id: this.studyId }) : undefined;
  },
  analysis() {
    return this.analysisId ? Analyses.findOne(this.analysisId) : undefined;
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
