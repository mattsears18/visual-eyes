import PlotHull from './PlotHull';
import { jStat } from 'jStat';
const json2csv = require('json2csv').parse;

export default class PlotHullCollection {
  constructor(viewing) {
    this.viewing = () => { return viewing; }
  }

  getHulls() {
    let hulls = [];
    let firstHullEndIndex = this.getEndRecordingIndex(0);
    let firstHull = new PlotHull(this.viewing(), 0, firstHullEndIndex);
    let endIndex;

    for(endIndex = (this.viewing().recordingPoints.length - 1); endIndex > firstHullEndIndex; endIndex--) {
      let startIndex = this.getStartRecordingIndex(endIndex);
      let h = new PlotHull(this.viewing(), startIndex, endIndex);
      hulls.push(h);
    }

    hulls.push(firstHull);
    hulls = hulls.reverse();

    return hulls;
  }

  getEndRecordingIndex(startIndex) {
    let startTime = this.viewing().recordingPoints[startIndex].recordingTime;
    let endIndex = startIndex;
    let duration = 0;

    while (duration < this.viewing().period) {
      endIndex++;
      if(this.viewing().recordingPoints[endIndex]) {
        let endTime = this.viewing().recordingPoints[endIndex].recordingTime;
        duration = endTime - startTime;
      } else {
        break;
      }
    }
    return endIndex - 1;
  }

  getStartRecordingIndex(endIndex) {
    let endTime = this.viewing().recordingPoints[endIndex].recordingTime;
    let startIndex = endIndex;
    let duration = 0;

    while (duration < this.viewing().period) {
      startIndex--;
      if(this.viewing().recordingPoints[startIndex]) {
        let startTime = this.viewing().recordingPoints[startIndex].recordingTime;
        duration = endTime - startTime;
      } else {
        break;
      }
    }
    return startIndex + 1;
  }

  getCSV() {
    let data = [];
    let hulls = this.getHulls();

    hulls.forEach((hull, hi) => {
      let hullData = {
        study: this.viewing().study().name,
        analysis: this.viewing().analysis().name,
        participant: this.viewing().participant().name,
        stimulus: hull.viewing().stimulus().name,
        viewingNumber: hull.viewing().number,
        period: this.viewing().analysis().period,
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
        centroidDistance: 0,
        centroidDistanceX: 0,
        centroidDistanceY: 0,
        stimulusWidth: hull.viewing().stimulus().width,
        stimulusHeight: hull.viewing().stimulus().height,
        stimulusArea: hull.viewing().stimulus().area(),
        area: hull.area(),
        areaDuration: hull.areaDuration(),
        averageArea: this.viewing().averageSlideHullArea,
        coverage: hull.coverage(),
        coverageDuration: hull.coverageDuration(),
        averageCoverage: this.viewing().averageSlideHullCoverage(),
      }

      if(hi > 0) {
        hullData.centroidDistanceX = (hulls[hi].centroid().x - hulls[hi - 1].centroid().x);
        hullData.centroidDistanceY = (hulls[hi].centroid().y - hulls[hi - 1].centroid().y);
        hullData.centroidDistance = Math.sqrt(hullData.centroidDistanceX * hullData.centroidDistanceX + hullData.centroidDistanceY * hullData.centroidDistanceY)
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
}
