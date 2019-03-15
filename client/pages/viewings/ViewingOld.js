Template.ViewingOld.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);

    var viewingId = FlowRouter.getParam('viewingId');

    self.subscribe('viewings.single', viewingId);
    self.subscribe('participants.byViewingId', viewingId);
    self.subscribe('stimuli.byViewingId', viewingId);
    self.subscribe('analyses.byViewingId', viewingId);
    self.subscribe('recordings.byViewingId', viewingId);

    if(viewingId && self.subscriptionsReady()) {
      var t0 = performance.now();
      Meteor.call('viewings.getSlideHullsOld', { viewingId: viewingId }, (err, hulls) => {
        if(err) {
          console.log(err);
        }
        // console.log(hulls);
        var t1 = performance.now();
        oldTime = t1 - t0;
        console.log("Old Method: " + helpers.formatNumber(oldTime) + " ms.")
      });
    }
  });

  Session.set('analysisType', '');
  Session.set('instantContinuous', 'instantaneous');
  Session.set('slideStep', 'slide');
  Session.set('centroidPeriod', 5000);
  Session.set('fixationTrailLength', 5);

  this.instantContinuousHidden = new ReactiveVar( true );
  this.slideStepHidden = new ReactiveVar( true );
  this.centroidPeriodHidden = new ReactiveVar( true );
  this.fixationTrailLengthHidden = new ReactiveVar( true );
});

Template.ViewingOld.helpers({
  selector: () => {
    var viewingId = FlowRouter.getParam('viewingId');
    viewing = Viewings.findOne(viewingId);
    if(viewing) {
      return { _id: { $in: viewing.recordingIds }};
    }
  },
  viewing: () => {
    return Viewings.findOne(FlowRouter.getParam('viewingId'));
  },
  participant: () => {
    return Participants.findOne();
  },

  instantContinuousHidden: () => { return Template.instance().instantContinuousHidden.get(); },
  slideStepHidden: () => { return Template.instance().slideStepHidden.get(); },
  centroidPeriodHidden: () => { return Template.instance().centroidPeriodHidden.get(); },
  fixationTrailLengthHidden: () => { return Template.instance().fixationTrailLengthHidden.get(); },
});

Template.BreadCrumbs.helpers({
  study: () => {
    return Studies.findOne();
  },
  viewing: () => {
    return Viewings.findOne();
  }
});

Template.ViewingOld.events({
  'click .update-viewing': function() {
    Session.set('updateViewing', true);
  },
  'change #analysisType': function(e, template) {
    Session.set('analysisType', e.target.value );
    if(e.target.value == 'convexHull') {
      template.instantContinuousHidden.set( false );
      template.slideStepHidden.set( false );
      template.centroidPeriodHidden.set( false );
      template.fixationTrailLengthHidden.set( false );
    }

    if(e.target.value == 'scanpathLength') {
      template.instantContinuousHidden.set( false );
      template.slideStepHidden.set( true );
    }

    if(e.target.value == 'scanpathVelocity') {
      template.instantContinuousHidden.set( false );
      template.slideStepHidden.set( true );
    }
  },
  'change #instantContinuous': function(e, template) {
    Session.set('instantContinuous', e.target.value );
  },
  'change #slideStep': function(e, template) {
    Session.set('slideStep', e.target.value );
  },
  'keyup #centroidPeriod': function(e, template) {
    Session.set('centroidPeriod', e.target.value );
  },
  'keyup #fixationTrailLength': function(e, template) {
    Session.set('fixationTrailLength', e.target.value );
  },
});

Template.ViewingOld.destroyed = function(){
  Session.set('updateViewing', false);
}
