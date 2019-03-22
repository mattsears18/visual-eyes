import Viewings from './Viewings';
import PlotHull from './PlotHull';
import getHullDataAsCSV from './getHullDataAsCSV';

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
  getEndRecordingIndex(ri) {
    let startTime = this.recordingPoints[ri].recordingTime;
    let ei = ri;
    let duration = 0;

    while (duration < this.period) {
      ei++;
      if(this.recordingPoints[ei]) {
        let endTime = this.recordingPoints[ei].recordingTime;
        duration = endTime - startTime;
      } else {
        break;
      }
    }
    return ei - 1;
  },
  getStartRecordingIndex(endIndex) {
    let endTime = this.recordingPoints[endIndex].recordingTime;
    let startIndex = endIndex;
    let duration = 0;

    while (duration < this.period) {
      startIndex--;
      if(this.recordingPoints[startIndex]) {
        let startTime = this.recordingPoints[startIndex].recordingTime;
        duration = endTime - startTime;
      } else {
        break;
      }
    }
    return startIndex + 1;
  },
  slideHulls() {
    let hulls = [];
    let firstHullEndIndex = this.getEndRecordingIndex(0);
    let firstHull = new PlotHull(this, 0, firstHullEndIndex);

    for(endIndex = (this.recordingPoints.length - 1); endIndex > firstHullEndIndex; endIndex--) {
      let startIndex = this.getStartRecordingIndex(endIndex);
      let h = new PlotHull(this, startIndex, endIndex);
      hulls.push(h);
    }

    hulls.push(firstHull);
    hulls = hulls.reverse();

    return hulls;
  },
  getHullDataAsCSV,
});
