import Jobs from '../Jobs/Jobs';
import getHullseries from './imports/getHullseries';
import getExportData from './imports/getExportData';
import getFixations from './imports/getFixations';
// import getGlanceSaccade from './imports/getGlanceSaccade';
import getSampledData from './imports/getSampledData';
import saveCSV from './imports/saveCSV';
import Stimuli from '../Stimuli/Stimuli';
// import getFixationProportion from './imports/getFixationProportion';

Visits.helpers({
  getHullseries,
  getExportData,
  getFixations,
  // getGlanceSaccade,
  saveCSV,
  getSampledData,
  // getFixationProportion,

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
  aoi() {
    return this.aoiId ? Aois.findOne(this.aoiId) : undefined;
  },
  aoiName() {
    return this.aoi() ? this.aoi().name : '';
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
  jobs() {
    return Jobs.find({ 'data.visitId': this._id });
  },
  jobsCompleted() {
    return Jobs.find({ 'data.visitId': this._id, status: 'completed' });
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
  // fixationCount() {
  //   return this.fixationIndices ? this.fixationIndices.length : 0;
  // },
  // fixationFrequency() {
  //   return this.fixationCount() / this.duration;
  // },
  firstFixationIndex() {
    return this.fixationIndices[0];
  },
  lastFixationIndex() {
    return this.fixationIndices[this.fixationIndices.length - 1];
  },
});
