import PlotHull from './PlotHull/PlotHull';
import { jStat } from 'jStat';
const json2csv = require('json2csv').parse;

export default class PlotHullCollection {
  constructor({
    viewing,
    slideStep,
  }) {
    this.viewing = () => { return viewing; }
    this.slideStep = slideStep;
  }

  getHulls() {
    let hulls = [];
    let firstHullEndIndex = this.getEndGazepointIndex(0);
    let firstHull = new PlotHull(this.viewing(), 0, firstHullEndIndex);
    let endIndex;

    for(endIndex = (this.viewing().gazepoints.length - 1); endIndex > firstHullEndIndex; endIndex--) {
      let startIndex = this.getStartGazepointIndex(endIndex);
      let h = new PlotHull(this.viewing(), startIndex, endIndex);
      hulls.push(h);
    }

    hulls.push(firstHull);
    hulls = hulls.reverse();

    return hulls;
  }

  getEndGazepointIndex(startIndex) {
    if(!(this.viewing() && this.viewing().gazepoints && this.viewing().gazepoints[startIndex])) {
      console.log('gazepoint not found!');
      console.log('startIndex: ' + startIndex);
      console.log('viewingId: ' + this.viewing()._id);
      return;
    }

    let startTime = this.viewing().gazepoints[startIndex].timestamp;
    let endIndex = startIndex;
    let duration = 0;

    while (duration < this.viewing().period) {
      endIndex++;
      if(this.viewing().gazepoints[endIndex]) {
        let endTime = this.viewing().gazepoints[endIndex].timestamp;
        duration = endTime - startTime;
      } else {
        break;
      }
    }
    return endIndex - 1;
  }

  getStartGazepointIndex(endIndex) {
    let endTime = this.viewing().gazepoints[endIndex].timestamp;
    let startIndex = endIndex;
    let duration = 0;

    while (duration < this.viewing().period) {
      startIndex--;
      if(this.viewing().gazepoints[startIndex]) {
        let startTime = this.viewing().gazepoints[startIndex].timestamp;
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
        link: Meteor.absoluteUrl() + 'studies/' + this.viewing().analysis().study()._id + '/viewings/' + this.viewing()._id,
        study: this.viewing().study().name,
        analysis: this.viewing().analysis().name,
        period: this.viewing().analysis().period,
        viewingGap: this.viewing().analysis().viewingGap,
        minViewingTime: this.viewing().analysis().minViewingTime,
        participant: this.viewing().participant().name,
        stimulus: hull.viewing().stimulus().name,
        viewingNumber: hull.viewing().number,
        stimulusWidth: hull.viewing().stimulus().width,
        stimulusHeight: hull.viewing().stimulus().height,
        stimulusArea: hull.viewing().stimulus().area(),
        period: this.viewing().analysis().period,
        startIndex: hull.startIndex,
        endIndex: hull.endIndex,
        startTime: hull.startTime(),
        endTime: hull.endTime(),
        hullPeriod: hull.period(),
        timeStep: hull.timeStep(),
        duration: hull.duration(),
        gazepointCount: hull.gazepoints().length,
        gazepointsX: hull.gazepoints('x'),
        gazepointsY: hull.gazepoints('y'),
        lastGazepointX: hull.lastGazepoint().x,
        lastGazepointY: hull.lastGazepoint().y,
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
        coverage: hull.coverage(),
        coverageDuration: hull.coverageDuration(),
        averageCoverage: this.viewing().averageSlideHullCoverage,
      }

      if(hi > 0) {
        hullData.centroidDistanceX = (hulls[hi].centroid().x - hulls[hi - 1].centroid().x);
        hullData.centroidDistanceY = (hulls[hi].centroid().y - hulls[hi - 1].centroid().y);
        hullData.centroidDistance = Math.sqrt(hullData.centroidDistanceX * hullData.centroidDistanceX + hullData.centroidDistanceY * hullData.centroidDistanceY)
        if(hullData.timeStep > 0 && hullData.centroidDistance > 0) {
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
}
