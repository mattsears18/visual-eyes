import Participants from '../../Participants/Participants';
import Aois from '../../Aois/Aois';
import Visits from '../../Visits/Visits';

export default function makeVisit(opts) {
  const {
    fixations, startIndex, endIndex, number,
  } = opts || {};

  if (!fixations || !fixations.length) {
    throw new Error('noFixations');
  }

  if (fixations.length < 2) {
    throw new Error('tooFewFixations');
  }

  const allFixations = [...fixations];

  if (!(startIndex > -1) || !allFixations[startIndex]) {
    throw new Error('invalidStartIndex');
  }

  if (startIndex > allFixations.length - 2) {
    throw new Error('startIndexTooHigh');
  }

  if (!endIndex || !allFixations[endIndex] || !(endIndex > startIndex)) {
    throw new Error('invalidEndIndex');
  }

  const { participantId } = allFixations[startIndex];
  if (!participantId) {
    throw new Error('noParticipantId');
  }

  const participant = Participants.findOne({ _id: participantId });
  if (!participant) {
    throw new Error('noParticipantFound');
  }

  const { aoiId } = allFixations[startIndex];
  if (!aoiId) {
    throw new Error('noAoiId');
  }

  const aoi = Aois.findOne({ _id: aoiId });
  if (!aoi) {
    throw new Error('noAoiFound');
  }

  const { timestamp } = allFixations[startIndex];
  const { timestampEnd } = allFixations[endIndex];
  const duration = timestampEnd - timestamp;

  let fixationsToSave = fixations
    .slice(startIndex, endIndex + 1)
    .filter(fixation => fixation.aoiId === aoiId);

  fixationsToSave = fixationsToSave.map(fixation => ({
    timestamp: fixation.timestamp,
    timestampEnd: fixation.timestampEnd,
    x: fixation.x,
    y: fixation.y,
  }));

  const fixationCount = fixationsToSave.length;

  let fixationFrequency = 0;

  if (duration > 0) {
    fixationFrequency = (fixationCount / duration) * 1000;
  }

  return Visits.insert({
    studyId: this.studyId,
    analysisId: this._id,
    participantId,
    aoiId,
    number,
    timestamp,
    timestampEnd,
    duration,
    fixations: fixationsToSave,
    fixationCount,
    fixationFrequency,
  });
}
