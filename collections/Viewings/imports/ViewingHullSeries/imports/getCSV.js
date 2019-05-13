const json2csv = require('json2csv').parse;

export default function getCSV() {
  const data = [];
  const hulls = this.getHulls();

  hulls.forEach((hull, hi) => {
    const hullData = {
      link: `${Meteor.absoluteUrl()}studies/${this.viewing.analysis().study()._id}/viewings/${this.viewing._id}`,
      study: this.viewing.study().name,
      analysis: this.viewing.analysis().name,
      viewingGap: this.viewing.analysis().viewingGap,
      minViewingTime: this.viewing.analysis().minViewingTime,
      period: this.period,
      participant: this.viewing.participant().name,
      stimulus: this.viewing.stimulus().name,
      viewingNumber: this.viewing.number,
      viewingDuration: this.viewing.duration,
      stimulusWidth: this.viewing.stimulus().width,
      stimulusHeight: this.viewing.stimulus().height,
      stimulusArea: this.viewing.stimulus().area(),
      hullNumber: hull.number,
      startIndex: hull.startIndex,
      endIndex: hull.endIndex,
      startTime: hull.startTime(),
      endTime: hull.endTime(),
      elapsedTime: (hull.endTime() - this.getStartTime()),
      elapsedTimeNormalized: ((hull.endTime() - this.getStartTime()) / this.getDuration()),
      startTimeNormalized: hull.startTime({ normalized: true }),
      endTimeNormalized: hull.endTime({ normalized: true }),
      hullPeriod: hull.period(),
      timestep: hull.timestep(),
      duration: hull.duration(),
      pointCount: hull.getPoints().length,
      // pointsX: hull.getPoints('x'),
      // pointsY: hull.getPoints('y'),
      lastPointX: hull.lastPoint().x,
      lastPointY: hull.lastPoint().y,
      distance: hull.distance(),
      distanceX: hull.distance('x'),
      distanceY: hull.distance('y'),
      velocity: hull.velocity(),
      velocityX: hull.velocity('x'),
      velocityY: hull.velocity('y'),
      centroidX: hull.centroid().x,
      centroidY: hull.centroid().y,
      centroidDistance: 0,
      centroidDistanceX: 0,
      centroidDistanceY: 0,
      centroidVelocity: 0,
      centroidVelocityX: 0,
      centroidVelocityY: 0,
      coverage: hull.coverage({ width: this.viewing.stimulus().width, height: this.viewing.stimulus().height }),
      coverageDuration: hull.coverageDuration({ width: this.viewing.stimulus().width, height: this.viewing.stimulus().height }),
      averageCoverage: this.getAverageCoverage(),
    };

    if (hi > 0) {
      hullData.centroidDistanceX = (hulls[hi].centroid({}).x - hulls[hi - 1].centroid({}).x);
      hullData.centroidDistanceY = (hulls[hi].centroid({}).y - hulls[hi - 1].centroid({}).y);
      hullData.centroidDistance = Math.sqrt(hullData.centroidDistanceX * hullData.centroidDistanceX + hullData.centroidDistanceY * hullData.centroidDistanceY);
      if (hullData.timeStep > 0 && hullData.centroidDistance > 0) {
        hullData.centroidVelocity = (hullData.centroidDistance / hullData.timeStep);
        hullData.centroidVelocityX = (hullData.centroidDistanceX / hullData.timeStep);
        hullData.centroidVelocityY = (hullData.centroidDistanceY / hullData.timeStep);
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
