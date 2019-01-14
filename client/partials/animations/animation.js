import plotConvexHullInstantaneousSlide from './convexHulls/instantaneousSlide';
import plotConvexHullInstantaneousStep  from './convexHulls/instantaneousStep';
import plotConvexHullContinuousSlide    from './convexHulls/continuousSlide';
import plotConvexHullContinuousStep     from './convexHulls/continuousStep';

Template.Animation.onCreated(function() {
  var self = this;
  self.autorun(function() {
    viewingId = Template.currentData().viewingId;

    if(viewingId) {
      self.subscribe('viewings.single', viewingId);
      self.subscribe('recordings.byViewingId', viewingId);
      self.subscribe('images.byViewingId', viewingId);
      self.subscribe('imagefiles.byViewingId', viewingId);
      self.subscribe('aois.byViewingId', viewingId);

      if(self.subscriptionsReady()) {
        viewing = Viewings.findOne(viewingId);

        if(viewing) {
          if(Session.get('analysisType') == 'convexHull') {
            if(Session.get('instantContinuous') == 'instantaneous') {
              if(Session.get('slideStep') == 'slide') {
                plotConvexHullInstantaneousSlide(viewing);
              } else if(Session.get('slideStep') == 'step') {
                plotConvexHullInstantaneousStep(viewing);
              }
            } else if(Session.get('instantContinuous') == 'continuous') {
              if(Session.get('slideStep') == 'slide') {
                plotConvexHullContinuousSlide(viewing);
              } else if(Session.get('slideStep') == 'step') {
                plotConvexHullContinuousStep(viewing);
              }
            }
          }
        }
      }
    }
  });
});

Template.Animation.helpers({
  viewing: () => { return Viewings.findOne(); },
  image: () => {   return Images.findOne(); },
});
