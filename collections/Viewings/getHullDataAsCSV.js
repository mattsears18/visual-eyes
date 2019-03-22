const json2csv = require('json2csv').parse;
import { jStat } from 'jStat';

export default function getHullDataAsCSV() {
  let viewing = this;
  let hulls = viewing.slideHulls();

  let data = [];

  hulls.forEach(function(hull) {
    let hullData = {
      study: viewing.study().name,
      analysis: viewing.analysis().name,
      participant: viewing.participant().name,
      stimulus: hull.viewing().stimulus().name,
      period: viewing.analysis().period,
      startIndex: hull.startIndex,
      endIndex: hull.endIndex,
      startTime: hull.startTime(),
      endTime: hull.endTime(),
      hullPeriod: hull.period(),
      timeStep: hull.timeStep(),
      duration: hull.duration(),
      pointCount: hull.recordings().length,
      pointsX: hull.recordings().map((recording) => {
        return parseInt(recording.x);
      }),
      pointsY: hull.recordings().map((recording) => {
        return parseInt(recording.y);
      }),
      lastPointX: hull.lastPointX(),
      lastPointY: hull.lastPointY(),
      distance: hull.distance(),
      distanceX: hull.distanceX(),
      distanceY: hull.distanceY(),
      centroidX: hull.centroid().x,
      centroidY: hull.centroid().y,
      centroidDistance: hull.centroidDistance(),
      centroidDistanceX: hull.centroidDistanceX(),
      centroidDistanceY: hull.centroidDistanceY(),
      stimulusWidth: hull.viewing().stimulus().width,
      stimulusHeight: hull.viewing().stimulus().height,
      stimulusArea: hull.viewing().stimulus().area(),
      area: hull.area(),
      areaDuration: hull.areaDuration(),
      averageArea: viewing.averageSlideHullArea,
      coverage: hull.coverage(),
      coverageDuration: hull.coverageDuration(),
      averageCoverage: viewing.averageSlideHullCoverage(),
    }

    data.push(hullData);
  });

  // const fields = ['field1', 'field2', 'field3'];
  // const opts = { fields };

  let csv;

  try {
    csv = json2csv(data);
  } catch (err) {
    console.error(err);
  }

  return csv;
}
