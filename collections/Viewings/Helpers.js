import Viewings from './Viewings';
import PlotHullCollection from './PlotHulls/PlotHullCollection';

Viewings.helpers({
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
    return (this.stimulus().width * this.stimulus().height);
  },
  averageSlideHullCoverage() {
    return (this.averageSlideHullArea / this.stimulusArea());
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
  recordings() {
    return Recordings.find({ _id: { $in: this.recordingIds }}, { sort: { recordingTime: 1 } });
  },
  aois() {
    if(this.aoiIds && this.aoiIds.length) {
      return Aois.find({ _id: { $in: this.aoiIds }}, { sort: { name: 1 } });
    }
  },
  plotHulls() { return new PlotHullCollection(this); }
});
