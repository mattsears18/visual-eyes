import Viewings from './Viewings';
import PlotHull from './PlotHull';

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
  stimulusName() {
    if(this.stimulus()) {
      return this.stimulus().name;
    }
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
    // return 27;
    startTime = this.recordingPoints[ri].recordingTime;
    ei = ri;
    duration = 0;

    while (duration < this.period) {
      ei++;
      if(this.recordingPoints[ei]) {
        endTime = this.recordingPoints[ei].recordingTime;
        duration = endTime - startTime;
      } else {
        break;
      }
    }
    return ei - 1;
  },
  getSlideHulls() {
    hulls = [];

    for (ri = 0; ri < this.recordingPoints.length; ri++) {
      startIndex = ri;
      endIndex = this.getEndRecordingIndex(ri);

      if(startIndex < endIndex) {
        h = new PlotHull(this.recordingPoints, startIndex, endIndex);
        hulls.push(h);
      }

      // Don't create additional hulls after reaching the end
      if(endIndex == this.recordingPoints.length - 1) break;
      // console.log('recording ' + ri + ' of ' + recordings.length);
    }

    return hulls;
  }
});















//
//
//
//

//
// Meteor.methods({
//   'viewings.getSlideHulls'({ viewingId }) {
//     // console.log('viewings.getSlideHulls');
//
//     check(viewingId, String);
//     viewing = Viewings.findOne(viewingId);
//
//     if(viewing && viewing.analysis()) {
//       // console.log('viewing id: ' + viewing._id);
//
//       period = viewing.analysis().period;
//       recordings = viewing.recordingPoints;
//
//       // console.log('recordings.length: ' + recordings.length);
//
//       hulls = [];
//
//       for (ri = 0; ri < recordings.length; ri++) {
//         startIndex = ri;
//         endIndex = getEndIndex(ri);
//
//         if(startIndex < endIndex) {
//           h = new PlotHull(recordings, startIndex, endIndex);
//
//           // console.log(h.timeStep);
//           // console.log(h.pointsXY());
//           // console.log(h.pointsX());
//
//           hulls.push(h);
//         }
//
//         // Don't create additional hulls after reaching the end
//         if(endIndex == recordings.length - 1) break;
//         // console.log('recording ' + ri + ' of ' + recordings.length);
//       }
//
//       // console.log('hulls.length: ' + hulls.length);
//       // console.log(hulls);
//       return hulls;
//     } else {
//       console.log('no viewing found or no viewing analysis found');
//     }
//   },
// });
//
