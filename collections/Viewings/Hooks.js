import Viewings from './Viewings';

Viewings.before.insert(function (userId, doc) {
  doc.createdAt = new Date;

  doc.minRecordingTime = Meteor.call('viewings.getMinTime', { viewing: doc });
  doc.maxRecordingTime = Meteor.call('viewings.getMaxTime', { viewing: doc });
  // doc.averageSlideHullSize = Meteor.call('viewings.saveAverageSlideHullSize', { viewing: doc });
  // doc.averageStepHullSize = Meteor.call('viewings.saveAverageStepHullSize', { viewing: doc });
  doc.slideHulls =  Meteor.call('viewings.getSlideHulls', { viewing: doc });
  doc.stepHulls =  Meteor.call('viewings.getStepHulls', { viewing: doc });
  doc.duration = doc.maxRecordingTime - doc.minRecordingTime;
});
