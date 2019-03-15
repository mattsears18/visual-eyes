import hull from 'hull.js';
var area = require('area-polygon');

export default class PlotHull {
  constructor(allRecordings, startIndex, endIndex) {
    this.startIndex = startIndex;
    this.endIndex = endIndex;

    this.recordings = () => {
      return allRecordings.slice(this.startIndex, this.endIndex + 1)
    }

    this.timeStep = () => {
      if(this.startIndex > 0) {
        return this.recordings()[0].recordingTime - allRecordings[this.startIndex - 1].recordingTime;
      } else {
        return 0;
      }
    }

    // TODO turn these into methods so that they're only calculted when they're actually needed (on the client)

    // centroids.push(h.centroid);
    // h.centroidHistory = JSON.parse(JSON.stringify(centroids));
    // h.centroidHistoryX = h.centroidHistory.map((point) => { return point.x; });
    // h.centroidHistoryY = h.centroidHistory.map((point) => { return point.y; });
  }

  startTime() {
    return this.recordings()[0].recordingTime;
  }

  endTime() {
    return this.recordings()[this.recordings().length - 1].recordingTime;
  }

  duration() {
    return this.endTime() - this.startTime();
  }

  points() {
    return this.recordings().map(function(recording) {
      return [parseInt(recording.x), parseInt(recording.y)];
    });
  }

  pointsXY() {
    return this.coordinatesToXY(this.points());
  }

  pointsX() {
    return this.points().map((point) => { return point[0]; });
  }

  pointsY() {
    return this.points().map((point) => { return point[1]; });
  }

  pointsTime() {
    return this.recordings().map(function(recording) {
      return recording.recordingTime;
    });
  }

  pointsTimeText() {
    return this.recordings().map(function(recording) {
      return 'Time: ' + recording.recordingTime + 'ms';
    });
  }

  polygon() {
    return hull(this.points(), Infinity);
  }

  area() {
    return area(this.points());
  }

  centroid() {
    return helpers.centroid(this.coordinatesToXY(this.polygon()));
  }



  //
  // function arrToXY(points) {
  //   return points.map(function(point) {
  //     return { x: point[0], y: point[1] };
  //   });
  // }
  //
  // function getCentroid(h) {

  //
  //   return helpers.centroid(pts);
  // }
  //

  coordinatesToXY(points) {
    return points.map(function(point) {
      return { x: point[0], y: point[1] };
    });
  }
}
