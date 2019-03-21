Meteor.methods({
  'viewings.saveCSV' ({ viewingId, analysisType, instantContinuous, slideStep, centroidPeriod, callback }) {
    console.log('viewingId: ' + viewingId);
    console.log('analysisType: ' + analysisType);
    console.log('instantContinuous: ' + instantContinuous);
    console.log('slideStep: ' + slideStep);
    console.log('centroidPeriod: ' + centroidPeriod);
  },
});
