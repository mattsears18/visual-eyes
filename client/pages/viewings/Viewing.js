// import hull from 'hull.js';

Template.Viewing.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);

    var viewingId = FlowRouter.getParam('viewingId');

    self.subscribe('viewings.single', viewingId);
    self.subscribe('datafiles.byViewingId', viewingId);
    self.subscribe('aois.byViewingId', viewingId);
    self.subscribe('analyses.byViewingId', viewingId);
    self.subscribe('recordings.byViewingId', viewingId);
  });

  this.analysisType = new ReactiveVar('');
  this.instantContinuous = new ReactiveVar('instantaneous');
  this.instantContinuousHidden = new ReactiveVar( true );
  this.slideStep = new ReactiveVar('slide');
  this.slideStepHidden = new ReactiveVar( true );
  this.centroidPeriodHidden = new ReactiveVar( true );
  this.fixationTrailLengthHidden = new ReactiveVar( true );
});

Template.Viewing.helpers({
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
  datafile: () => {
    return Datafiles.findOne();
  },
  recordings: () => {
    return Recordings.find();
  },
  analysisType: () => { return Template.instance().analysisType.get(); },
  instantContinuous: () => { return Template.instance().instantContinuous.get(); },
  instantContinuousHidden: () => { return Template.instance().instantContinuousHidden.get(); },
  slideStep: () => { return Template.instance().slideStep.get(); },
  slideStepHidden: () => { return Template.instance().slideStepHidden.get(); },
  centroidPeriodHidden: () => { return Template.instance().centroidPeriodHidden.get(); },
  fixationTrailLengthHidden: () => { return Template.instance().fixationTrailLengthHidden.get(); },

  analysisTypeIs: (type) => {
    console.log(type);
    return true;
  }
});

Template.BreadCrumbs.helpers({
  study: () => {
    return Studies.findOne();
  },
  viewing: () => {
    return Viewings.findOne();
  }
});

Template.Viewing.events({
  'click .update-viewing': function() {
    Session.set('updateViewing', true);
  },
  'change #analysisType': function(e, template) {
    template.analysisType.set( e.target.value );
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
    template.instantContinuous.set( e.target.value );
  },
  'change #slideStep': function(e, template) {
    template.slideStep.set( e.target.value );
  },
});

Template.Viewing.destroyed = function(){
  Session.set('updateViewing', false);
}
