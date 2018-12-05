Template.Animation.onCreated(function() {
  var self = this;
  self.autorun(function() {
    centroids = [];
    viewingId = Template.currentData().viewingId;

    if(viewingId) {
      self.subscribe('viewings.single', viewingId);
      self.subscribe('recordings.byViewingId', viewingId);
      self.subscribe('images.byViewingId', viewingId);
      self.subscribe('aois.byViewingId', viewingId);

      if(self.subscriptionsReady()) {
        viewing = Viewings.findOne(viewingId);

        // if(viewing) {
            // Load the correct animation .js file based upon the selected options
            // if(Session.get('analysisType') == 'convexHull') {
            //   console.log('conve hull');
            // }
            //   plotInit(viewing);
        // }
      }
    }
  });
});

// Template.Animation.helpers({
//   analysisTypeIs: (type) => {
//     if(type == Session.get('analysisType')) {
//       return true;
//     }
//   },
//   instantContinuousIs: (val) => {
//     if(val == Session.get('instantContinuous')) {
//       return true;
//     }
//   },
//   slideStepIs: (val) => {
//     if(val == Session.get('slideStep')) {
//       return true;
//     }
//   },
// });

Template.Animation.helpers({
  hulls: () => {
    viewing = Viewings.findOne();

    hulls = [];
    if(viewing) { hulls = viewing.getHulls(); }
    console.log('hulls');
    console.log(hulls);
    return hulls;
  },
  viewing: () => { return Viewings.findOne(); },
  image: () => {   return Images.findOne(); },
});
