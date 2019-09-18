// import Participants from '../../Participants/Participants';
// import Aois from '../../Aois/Aois';
// import Visits from '../../Visits/Visits';

// export default function makeVisit(opts) {
//   if (Meteor.isServer) console.log('Analyses.makeVisit()');

//   const {
//     fixations, startIndex, endIndex, number,
//   } = opts || {};

//   // TODO FUTURE - handle blinks and saccades
//   if (!fixations || !fixations.length) {
//     throw new Error('noFixations');
//   }

//   if (fixations.length < 2) {
//     throw new Error('tooFewFixations');
//   }

//   const allFixations = [...fixations];

//   if (!(startIndex > -1) || !allFixations[startIndex]) {
//     throw new Error('invalidStartIndex');
//   }

//   if (startIndex > allFixations.length - 2) {
//     throw new Error('startIndexTooHigh');
//   }

//   if (!endIndex || !allFixations[endIndex] || !(endIndex > startIndex)) {
//     throw new Error('invalidEndIndex');
//   }

//   const { participantId } = allFixations[startIndex];
//   if (!participantId) {
//     throw new Error('noParticipantId');
//   }

//   const participant = Participants.findOne({ _id: participantId });
//   if (!participant) {
//     throw new Error('noParticipantFound');
//   }

//   const { aoiId } = allFixations[startIndex];
//   if (!aoiId) {
//     throw new Error('noAoiId');
//   }

//   const aoi = Aois.findOne({ _id: aoiId });
//   if (!aoi) {
//     throw new Error('noAoiFound');
//   }

//   const { stimulusId } = allFixations[startIndex];
//   if (!stimulusId) {
//     throw new Error('noStimulusId');
//   }

//   const stimulus = Stimuli.findOne({ _id: stimulusId });
//   if (!stimulus) {
//     throw new Error('noStimulusFound');
//   }

//   const { timestamp } = allFixations[startIndex];
//   const duration = allFixations[endIndex].timestamp
//     + allFixations[endIndex].duration
//     - timestamp;

//   // let fixationsToSave = fixations
//   //   .slice(startIndex, endIndex + 1)
//   //   .filter(fixation => fixation.aoiId === aoiId);

//   // fixationsToSave = fixationsToSave.map(fixation => ({
//   //   timestamp: fixation.timestamp,
//   //   timestampEnd: fixation.timestampEnd,
//   //   x: fixation.x,
//   //   y: fixation.y,
//   // }));

//   const fixationCount = fixationsToSave.length;

//   let fixationFrequency = 0;

//   if (duration > 0) {
//     fixationFrequency = (fixationCount / duration) * 1000;
//   }

//   return Visits.insert({
//     studyId: this.studyId,
//     analysisId: this._id,
//     participantId,
//     aoiId,
//     stimulusId,
//     number,
//     timestamp,
//     timestampEnd,
//     duration,
//     fixations: fixationsToSave,
//     fixationCount,
//     fixationFrequency,
//   });
// }
