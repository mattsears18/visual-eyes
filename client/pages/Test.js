Template.Test.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var viewingId = FlowRouter.getParam('viewingId');

    self.subscribe('viewings.single', viewingId);
    self.subscribe('analyses.byViewingId', viewingId);
    // self.subscribe('recordings.byViewingId', viewingId);
    // self.subscribe('recordings.forPlotHulls.byViewingId', viewingId); // this is actually slower... don't use it

    if(viewingId && self.subscriptionsReady()) {
      var t0 = performance.now();

      viewing = Viewings.findOne({_id: viewingId});
      console.log(viewing.recs);
      // Meteor.call('viewings.getSlideHulls', { viewingId: viewingId }, (err, hulls) => {
      //   if(err) {
      //     console.log(err);
      //   }
      //
      //   console.log(hulls);
      //   var t1 = performance.now();
      //   oldTime = t1 - t0;
      //   console.log("New Method: " + helpers.formatNumber(oldTime) + " ms.")
      // });
    }
  });
});
