import { jStat } from 'jStat';

Meteor.methods({
  'viewings.getAverageSlideHullSize'({ viewingId }) {
    check(viewingId, String);
    console.log('viewings.getAverageSlideHullSize');
    viewing = Viewings.findOne(viewingId);

    if(viewing) {
      slideHulls = Meteor.call('viewings.getSlideHulls', { viewingId: viewingId });

      console.log('slideHulls:');
      console.log(slideHulls);

      timeAreas = slideHulls.map(hull => hull.area * hull.timeStep);
      times = slideHulls.map(hull => hull.timeStep);

      return jStat.sum(timeAreas) / jStat.sum(times);
    } else {
      console.log('no viewing found');
      return 0;
    }
  },
});
