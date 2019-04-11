export default function makeViewingFromGazepoints({
  gazepoints,
  startIndex,
  endIndex,
  number,
  participantId,
  stimulusId,
}) {
  // if(!participantId) { throw new Error('noParticipantId'); }
  // let participant = Participants.findOne({ _id: participantId });
  // if(!participant) {
  //   throw new Error('noParticipantFound');
  // }
  //
  // if(!stimulusId) { throw new Error('noStimulusId'); }
  let stimulus = Stimuli.findOne({ _id: stimulusId });
  // if(!stimulus) {
  //   throw new Error('noStimulusFound');
  // }
  // console.log('make viewing ' + number + ': [' + startIndex + ', ' + endIndex + ']');

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

  let analysis = this;
  let status = 'processing';

  if(stimulus.width && stimulus.height) {
    points = this.normalizeGazepoints(points);
  } else {
    status = 'invalidStimulusDimensions';
  }

  return new Promise((resolve, reject) => {
    Viewings.insert({
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
      gazepointFrequency: points.length / duration * 1000,
      fixationCount: fixationCount,
      fixationFrequency: fixationCount / duration * 1000,
      status: status,
    }, (err, id) => {
      if (err) {
        reject(err);
      } else {
        let viewing = Viewings.findOne({ _id: id });
        resolve(viewing);
      }
    });
  });
}
