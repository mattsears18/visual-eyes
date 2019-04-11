export default function makeViewingFromGazepoints({
  gazepoints,
  startIndex,
  endIndex,
  number,
  participantId,
  stimulusId,
}) {
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
      status: 'processing',
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
