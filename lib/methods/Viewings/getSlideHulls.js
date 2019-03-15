import PlotHull from './PlotHull';

Meteor.methods({
  'viewings.getSlideHulls'({ viewingId }) {
    // console.log('viewings.getSlideHulls');

    check(viewingId, String);
    viewing = Viewings.findOne(viewingId);

    if(viewing && viewing.analysis()) {
      // console.log('viewing id: ' + viewing._id);

      period = viewing.analysis().period;
      recordings = viewing.recordingPoints;

      // console.log('recordings.length: ' + recordings.length);

      hulls = [];

      for (ri = 0; ri < recordings.length; ri++) {
        startIndex = ri;
        endIndex = getEndIndex(ri);

        if(startIndex < endIndex) {
          h = new PlotHull(recordings, startIndex, endIndex);

          // console.log(h.timeStep);
          // console.log(h.pointsXY());
          // console.log(h.pointsX());

          hulls.push(h);
        }

        // Don't create additional hulls after reaching the end
        if(endIndex == recordings.length - 1) break;
        // console.log('recording ' + ri + ' of ' + recordings.length);
      }

      // console.log('hulls.length: ' + hulls.length);
      // console.log(hulls);
      return hulls;
    } else {
      console.log('no viewing found or no viewing analysis found');
    }
  },
});

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
