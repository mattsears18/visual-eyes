// const json2csv = require('json2csv').parse;


  // getCSV() {
  //   let data = [];
  //   let hulls = this.getHulls();
  //
  //   hulls.forEach((hull, hi) => {
  //     let hullData = {
  //       link: Meteor.absoluteUrl() + 'studies/' + this.viewing().analysis().study()._id + '/viewings/' + this.viewing()._id,
  //       study: this.viewing().study().name,
  //       analysis: this.viewing().analysis().name,
  //       period: this.viewing().analysis().period,
  //       viewingGap: this.viewing().analysis().viewingGap,
  //       minViewingTime: this.viewing().analysis().minViewingTime,
  //       participant: this.viewing().participant().name,
  //       stimulus: hull.viewing().stimulus().name,
  //       viewingNumber: hull.viewing().number,
  //       stimulusWidth: hull.viewing().stimulus().width,
  //       stimulusHeight: hull.viewing().stimulus().height,
  //       stimulusArea: hull.viewing().stimulus().area(),
  //       hullNumber: hi + 1,
  //       period: this.viewing().analysis().period,
  //       startIndex: hull.startIndex,
  //       endIndex: hull.endIndex,
  //       startTime: hull.startTime(),
  //       endTime: hull.endTime(),
  //       hullPeriod: hull.period(),
  //       timeStep: hull.timeStep(),
  //       duration: hull.duration(),
  //       pointCount: hull.points().length,
  //       pointsX: hull.points('x'),
  //       pointsY: hull.points('y'),
  //       lastPointX: hull.lastPoint().x,
  //       lastPointY: hull.lastPoint().y,
  //       distance: hull.distance(),
  //       distanceX: hull.distance('x'),
  //       distanceY: hull.distance('y'),
  //       velocity: hull.velocity(),
  //       velocityX: hull.velocity('x'),
  //       velocityY: hull.velocity('y'),
  //       centroidX: hull.centroid({}).x,
  //       centroidY: hull.centroid({}).y,
  //       centroidDistance: 0,
  //       centroidDistanceX: 0,
  //       centroidDistanceY: 0,
  //       centroidVelocity: 0,
  //       centroidVelocityX: 0,
  //       centroidVelocityY: 0,
  //       coverage: hull.coverage({}),
  //       coverageDuration: hull.coverageDuration(),
  //       averageCoverage: this.viewing().averageSlideHullCoverage,
  //     }
  //
  //     if(hi > 0) {
  //       hullData.centroidDistanceX = (hulls[hi].centroid({}).x - hulls[hi - 1].centroid({}).x);
  //       hullData.centroidDistanceY = (hulls[hi].centroid({}).y - hulls[hi - 1].centroid({}).y);
  //       hullData.centroidDistance = Math.sqrt(hullData.centroidDistanceX * hullData.centroidDistanceX + hullData.centroidDistanceY * hullData.centroidDistanceY)
  //       if(hullData.timeStep > 0 && hullData.centroidDistance > 0) {
  //         hullData.centroidVelocity = (hullData.centroidDistance / hullData.timeStep);
  //         hullData.centroidVelocityX = (hullData.centroidDistanceX / hullData.timeStep);
  //         hullData.centroidVelocityY = (hullData.centroidDistanceY / hullData.timeStep);
  //       }
  //
  //     }
  //
  //     data.push(hullData);
  //   });
  //
  //   let csv;
  //
  //   try {
  //     csv = json2csv(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  //
  //   return csv;
  // }
