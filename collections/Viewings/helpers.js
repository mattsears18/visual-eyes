import Jobs                     from '../Jobs/Jobs';
import PlotHullSeries           from './PlotHullSeries/PlotHullSeries';
import makeHullJobs             from './imports/makeHullJobs';
import saveAverageHullCoverage  from './imports/saveAverageHullCoverage';
import updateStatus             from './imports/updateStatus';

Viewings.helpers({
  makeHullJobs,
  saveAverageHullCoverage,
  updateStatus,

  plotHullSeries(params) {
    return new PlotHullSeries({ viewing: this, ...params });
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
  jobs() {
    return Jobs.find({ 'data.viewingId': this._id });
  },
  jobsCompleted() {
    return Jobs.find({ 'data.viewingId': this._id, 'status': 'completed' });
  },
  jobsProgress() {
    let progress = 0;
    if(this.jobs().count()) {
      progress = (this.jobsCompleted().count() / this.jobs().count() * 100);
    }
    return progress;
  },
  allJobsCompleted() {
    return (this.jobs().count() == this.jobsCompleted().count());
  },
});
