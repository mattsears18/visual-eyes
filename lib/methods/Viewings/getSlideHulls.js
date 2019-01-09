import hull from 'hull.js';

Meteor.methods({
  'viewings.getSlideHulls'({ viewingId }) {
    // console.log('viewings.getSlideHulls');

    check(viewingId, String);
    viewing = Viewings.findOne(viewingId);

    if(viewing && viewing.analysis()) {
      period = viewing.analysis().period;
      recordings = viewing.recordings().fetch();

      hulls = [];

      function getEndIndex(ri) {
        startTime = recordings[ri].recordingTime;
        ei = ri;
        duration = 0;

        while (duration < period) {
          ei++;
          if(recordings[ei]) {
            endTime = recordings[ei].recordingTime;
            duration = endTime - startTime;
          } else {
            break;
          }
        }
        return ei - 1;
      }

      function getPoints(h) {
        return h.recordings.map(function(recording) {
          return [parseInt(recording.x), parseInt(recording.y)];
        });
      }

      function arrToXY(points) {
        return points.map(function(point) {
          return { x: point[0], y: point[1] };
        });
      }

      function getCentroid(h) {
        pts = h.polygon.map(function(point) {
          return { x: point[0], y: point[1] };
        });

        return helpers.centroid(pts);
      }

      function getTimeStep(h) {
        if(h.startIndex > 0) {
          return h.startTime - recordings[h.startIndex - 1].recordingTime;
        } else {
          return 0;
        }
      }

      for (ri = 0; ri < recordings.length; ri++) {
        h = {};
        h.startIndex = ri;
        h.endIndex = getEndIndex(ri);

        if(h.endIndex > h.startIndex) {
          h.startTime = recordings[ri].recordingTime;
          h.endTime = recordings[h.endIndex].recordingTime;
          h.timeStep = getTimeStep(h);
          h.duration = h.endTime - h.startTime;
          h.recordings = recordings.slice(ri, h.endIndex + 1);
          h.points = getPoints(h);
          h.pointsXY = arrToXY(h.points);
          h.polygon = hull(h.points, Infinity);
          h.polygonXY = arrToXY(h.polygon);
          h.centroid = getCentroid(h);
          h.size = Math.random();

          hulls.push(h);
        }

        // Don't create additional hulls after reaching the end
        if(h.endIndex == recordings.length - 1) break;
      }

      return hulls;
    }
  },
});
