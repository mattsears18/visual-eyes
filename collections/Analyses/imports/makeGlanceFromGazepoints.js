export default function makeGazeFromGazepoints({
  participantId,
  stimulusId,
  gazepoints = [],
  startIndex = 0,
  endIndex,
  number = 1,
  fileFormat
}) {
  if (!fileFormat) {
    throw new Error('noFileFormat');
  }

  if (!participantId) {
    throw new Error('noParticipantId');
  }
  const participant = Participants.findOne({ _id: participantId });
  if (!participant) {
    throw new Error('noParticipantFound');
  }

  if (!stimulusId) {
    throw new Error('noStimulusId');
  }
  const stimulus = Stimuli.findOne({ _id: stimulusId });
  if (!stimulus) {
    throw new Error('noStimulusFound');
  }

  if (!gazepoints.length) {
    throw new Error('noGazepoints');
  }
  if (!gazepoints[startIndex]) {
    throw new Error('startIndexOutOfBounds');
  }
  if (!endIndex) {
    endIndex = gazepoints.length - 1;
  }
  if (!gazepoints[endIndex]) {
    throw new Error('endIndexOutOfBounds');
  }

  const pointsFull = gazepoints.slice(startIndex, endIndex + 1);
  const points = pointsFull.map(point => ({
    timestamp: point.timestamp,
    x: point.x,
    y: point.y,
    fixationIndex: point.fixationIndex
  }));

  let duration = 0;
  duration = gazepoints[endIndex].timestamp - gazepoints[startIndex].timestamp;
  const fixationCount = this.getGazeFixationCount(points);

  let gazepointFrequency = 0;
  let fixationFrequency = 0;

  if (duration > 0) {
    gazepointFrequency = (points.length / duration) * 1000;
    fixationFrequency = (fixationCount / duration) * 1000;
  }

  const analysis = this;
  let status = 'processed';

  if (!stimulus.width || !stimulus.height) {
    status = 'invalidStimulusDimensions';
  }

  return Gazes.insert({
    studyId: this.studyId,
    analysisId: analysis._id,
    participantId,
    stimulusId,
    aoiIds: this.getGazeAoiIds(pointsFull),
    number,
    startTime: gazepoints[startIndex].timestamp,
    endTime: gazepoints[endIndex].timestamp,
    duration,
    gazepoints: points,
    gazepointCount: points.length,
    gazepointFrequency,
    fixationCount,
    fixationFrequency,
    status,
    fileFormat
  });
}
