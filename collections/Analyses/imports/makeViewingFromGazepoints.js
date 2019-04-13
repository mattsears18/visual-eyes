export default function makeViewingFromGazepoints({
  participantId,
  stimulusId,
  gazepoints = [],
  startIndex = 0,
  endIndex,
  number = 1,
}) {
  if(!participantId) { throw new Error('noParticipantId'); }
  let participant = Participants.findOne({ _id: participantId });
  if(!participant) {
    throw new Error('noParticipantFound');
  }

  if(!stimulusId) { throw new Error('noStimulusId'); }
  let stimulus = Stimuli.findOne({ _id: stimulusId });
  if(!stimulus) {
    throw new Error('noStimulusFound');
  }

  if(!gazepoints.length) { throw new Error('noGazepoints'); }
  if(!gazepoints[startIndex]) { throw new Error('startIndexOutOfBounds'); }
  if(!endIndex) { endIndex = gazepoints.length - 1 }
  if(!gazepoints[endIndex]) { throw new Error('endIndexOutOfBounds'); }

  let pointsFull = gazepoints.slice(startIndex, endIndex + 1);
  let points = pointsFull.map(point => {
    return {
      timestamp: point.timestamp,
      x: point.x,
      y: point.y,
      fixationIndex: point.fixationIndex,
    }
  });

  let duration = gazepoints[endIndex].timestamp - gazepoints[startIndex].timestamp;
  let fixationCount = this.getViewingFixationCount(points);

  let gazepointFrequency = 0;
  let fixationFrequency = 0;

  if(duration > 0) {
    gazepointFrequency = points.length / duration * 1000;
    fixationFrequency  = fixationCount / duration * 1000;
  }

  let analysis = this;
  let status = 'processing';

  if(!stimulus.width || !stimulus.height) {
    status = 'invalidStimulusDimensions';
  }

  return Viewings.insert({
    studyId: this.studyId,
    analysisId: analysis._id,
    period: this.period,
    participantId: participantId,
    stimulusId: stimulusId,
    aoiIds: this.getViewingAoiIds(pointsFull),
    number: number,
    startTime: gazepoints[startIndex].timestamp,
    endTime: gazepoints[endIndex].timestamp,
    duration: duration,
    gazepoints: points,
    gazepointCount: points.length,
    gazepointFrequency: gazepointFrequency,
    fixationCount: fixationCount,
    fixationFrequency: fixationFrequency,
    status: status,
  });
}
