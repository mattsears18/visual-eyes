import PlotHullCollection       from './PlotHullCollection/PlotHullCollection';
import getLayout                from './helpers/getLayout';
import getInitialTraces         from './helpers/getInitialTraces';
import getFrames                from './helpers/getFrames';
import makeHullJobs             from './helpers/makeHullJobs';
import saveAverageHullCoverage  from './helpers/saveAverageHullCoverage'

Viewings.helpers({
  getLayout,
  getInitialTraces,
  getFrames,
  makeHullJobs,
  saveAverageHullCoverage,

  plotHullCollection({ slideStep }) {
    return new PlotHullCollection({
      viewing: this,
      slideStep: slideStep,
    });
  },
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
  datafile() {
    return Datafiles.findOne(this.datafileId);
  },
  datafileName() {
    if(this.datafile()) {
      return this.datafile().name;
    }
  },
  participant() {
    return Participants.findOne(this.participantId);
  },
  participantName() {
    if(this.participant()) {
      return this.participant().name;
    }
  },
  stimulus() {
    return Stimuli.findOne(this.stimulusId);
  },
  stimulusArea() {
    return this.stimulus().area();
  },
  stimulusName() {
    if(this.stimulus()) {
      return this.stimulus().name;
    }
  },
  study() {
    return Studies.findOne({ _id: this.studyId });
  },
  analysis() {
    return Analyses.findOne(this.analysisId);
  },
  aois() {
    if(this.aoiIds && this.aoiIds.length) {
      return Aois.find({ _id: { $in: this.aoiIds }}, { sort: { name: 1 } });
    }
  },
});
