Template.Test.onCreated(function() {
  var self = this;
  self.autorun(function() {
    let viewingId = FlowRouter.getParam('viewingId');

    self.subscribe('viewings.single', viewingId);
    self.subscribe('analyses.byViewingId', viewingId);
    self.subscribe('stimuli.byViewingId', viewingId);

    if(viewingId && self.subscriptionsReady()) {
      let t0 = performance.now();
      let t1;

      let viewing = Viewings.findOne({_id: viewingId});
      console.log(viewing);

    }
  });
});
