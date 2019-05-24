const json2csv = require('json2csv').parse;

export default function getCSV(opt) {
  opt = opt || {};

  if (typeof opt.period === 'undefined') {
    throw new Error('noPeriod');
  }

  if (typeof opt.timestep === 'undefined') {
    throw new Error('noTimestep');
  }

  const samplingRate = typeof opt.samplingRate !== 'undefined' ? opt.samplingRate : 100;

  const data = [];
  const hullseries = this.getHullseries({
    period: opt.period,
    timestep: opt.timestep,
    includeIncomplete: opt.includeIncomplete ? opt.includeIncomplete : false,
  });

  const hulls = hullseries.getHulls();

  console.log(hullseries);

  hulls.forEach((hull, hi) => {
    const hullData = {
      link: `${Meteor.absoluteUrl()}studies/${
        this.analysis().study()._id
      }/analyses/${this.analysisId}/${this.participantId}/${this.stimulusId}/${
        this.number
      }`,
      study: this.study().name,
      analysis: this.analysis().name,
      viewingGap: this.analysis().viewingGap,
      minViewingTime: this.analysis().minViewingTime,
      period: opt.period,
      timestep: opt.timestep,
      includeIncomplete: opt.includeIncomplete ? 'true' : 'false',
      participant: this.participant().name,
      stimulus: this.stimulus().name,
      viewingNumber: this.number,
      viewingDuration: this.duration,
      stimulusWidth: this.stimulus().width,
      stimulusHeight: this.stimulus().height,
      stimulusArea: this.stimulus().area(),
      hullNumber: hull.number,
      startPointIndex: hull.startIndex,
      endPointIndex: hull.endIndex,
      startTime: hull.startTime(),
      endTime: hull.endTime(),
      // elapsedTime: hull.endTime() - hullseries.getStartTime(),
      // elapsedTimeNormalized:
      //   (hull.endTime() - this.getStartTime()) / this.getDuration(),
      // startTimeNormalized: hull.startTime({ normalized: true }),
      // endTimeNormalized: hull.endTime({ normalized: true }),
      // hullPeriod: hull.period(),
      // timestep: hull.timestep(),
      // duration: hull.duration(),
      // pointCount: hull.getPoints().length,
      // // pointsX: hull.getPoints('x'),
      // // pointsY: hull.getPoints('y'),
      // lastPointX: hull.lastPoint().x,
      // lastPointY: hull.lastPoint().y,
      // distance: hull.distance(),
      // distanceX: hull.distance('x'),
      // distanceY: hull.distance('y'),
      // velocity: hull.velocity(),
      // velocityX: hull.velocity('x'),
      // velocityY: hull.velocity('y'),
      // centroidX: hull.centroid().x,
      // centroidY: hull.centroid().y,
      // centroidDistance: 0,
      // centroidDistanceX: 0,
      // centroidDistanceY: 0,
      // centroidVelocity: 0,
      // centroidVelocityX: 0,
      // centroidVelocityY: 0,
      // coverage: hull.coverage({
      //   width: this.stimulus().width,
      //   height: this.stimulus().height,
      // }),
      // coverageDuration: hull.coverageDuration({
      //   width: this.stimulus().width,
      //   height: this.stimulus().height,
      // }),
      // averageCoverage: this.getAverageCoverage(),
    };

    if (hi > 0) {
      hullData.centroidDistanceX = hulls[hi].centroid({}).x - hulls[hi - 1].centroid({}).x;
      hullData.centroidDistanceY = hulls[hi].centroid({}).y - hulls[hi - 1].centroid({}).y;
      hullData.centroidDistance = Math.sqrt(
        hullData.centroidDistanceX * hullData.centroidDistanceX
          + hullData.centroidDistanceY * hullData.centroidDistanceY,
      );
      if (hullData.timeStep > 0 && hullData.centroidDistance > 0) {
        hullData.centroidVelocity = hullData.centroidDistance / hullData.timeStep;
        hullData.centroidVelocityX = hullData.centroidDistanceX / hullData.timeStep;
        hullData.centroidVelocityY = hullData.centroidDistanceY / hullData.timeStep;
      }
    }

    data.push(hullData);
  });

  let csv;

  try {
    csv = json2csv(data);
  } catch (err) {
    console.error(err);
  }

  return csv;
}

// export default function getCSV() {
//   const analysis = this;
//   const viewings = Viewings.find({ analysisId: analysis._id }).fetch();

//   const data = [];

//   viewings.forEach(function(viewing) {
//     const viewingData = {
//       link: `${Meteor.absoluteUrl()}studies/${analysis.study()._id}/viewings/${viewing._id}`,
//       study: analysis.study().name,
//       analysis: analysis.name,
//       period: analysis.period,
//       viewingGap: analysis.viewingGap,
//       minViewingTime: analysis.minViewingTime,
//       participant: viewing.participant().name,
//       stimulus: viewing.stimulus().name,
//       viewingNumber: viewing.number,
//       stimulusWidth: viewing.stimulus().width,
//       stimulusHeight: viewing.stimulus().height,
//       stimulusArea: viewing.stimulus().area(),
//       viewingStartTime: viewing.startTime,
//       viewingEndTime: viewing.endTime,
//       viewingDuration: viewing.duration,
//       gazepointCount: viewing.gazepointCount,
//       gazepointFrequency: viewing.gazepointFrequency,
//       fixationCount: viewing.fixationCount,
//       fixationFrequency: viewing.fixationFrequency,
//       fixationProportion: '',
//       slideHullCount: '',
//       firstHullStartTime: '',
//       lastHullEndTime: '',
//       slideHullCoveragePerHull: '',
//       slideHullDurationPerHull: '',
//       slideHullDurationPerViewing: '',
//       slideHullCoverageDurationPerHull: '',
//       slideHullCoverageDurationPerViewing: '',
//       averageSlideHullCoveragePerViewing: '',
//     };

//     data.push(viewingData);
//   });

//   return CSV.unparse(data);
// }
