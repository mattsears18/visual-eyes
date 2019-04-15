Template.Viewing.onCreated(function() {
  this.instantContinuousVisible = new ReactiveVar( true );
  this.slideStepVisible = new ReactiveVar( true );
  this.centroidPeriodVisible = new ReactiveVar( false );
  this.fixationTrailLengthVisible = new ReactiveVar( true );
  this.animationVisible = new ReactiveVar( true );
  this.layout = new ReactiveVar();
  this.initialTraces = new ReactiveVar([]);
  this.frames = new ReactiveVar([]);

  Session.set('instantContinuous', 'instantaneous');
  Session.set('slideStep', 'slide');
  Session.set('centroidPeriod', 5000);
  Session.set('fixationTrailLength', 40);

  this.autorun(() => {
    var studyId = FlowRouter.getParam('studyId');
    this.subscribe('studies.single', studyId);

    var viewingId = FlowRouter.getParam('viewingId');
    let viewing = Viewings.findOne({});

    this.subscribe('viewings.single.withGazepoints', viewingId);
    this.subscribe('participants.byViewingId', viewingId);
    this.subscribe('stimuli.byViewingId', viewingId);
    this.subscribe('stimulusfiles.byViewingId', viewingId);
    this.subscribe('analyses.byViewingId', viewingId);

    if(viewing && this.subscriptionsReady()) {
      let hullSeries = viewing.plotHullSeries({
        instantContinuous: Session.get('instantContinuous'),
        slideStep: Session.get('slideStep'),
        centroidPeriod: Session.get('centroidPeriod'),
        fixationTrailLength: Session.get('fixationTrailLength'),
      });

      this.layout.set(hullSeries.getLayout());
      this.initialTraces.set(hullSeries.getInitialTraces());
      this.frames.set(hullSeries.getFrames());
    }
  });
});

Template.Viewing.helpers({
  viewing: () => {
    return Viewings.findOne(FlowRouter.getParam('viewingId'));
  },
  participant: () => {
    return Participants.findOne();
  },

  instantContinuousVisible: () => { return Template.instance().instantContinuousVisible.get(); },
  slideStepVisible: () => { return Template.instance().slideStepVisible.get(); },
  centroidPeriodVisible: () => { return Template.instance().centroidPeriodVisible.get(); },
  fixationTrailLengthVisible: () => { return Template.instance().fixationTrailLengthVisible.get(); },
  animationVisible: () => { return Template.instance().animationVisible.get(); },
  layout: () => { return Template.instance().layout.get(); },
  initialTraces: () => { return Template.instance().initialTraces.get(); },
  frames: () => { return Template.instance().frames.get(); },
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
  'change #instantContinuous': function(e, template) {
    Session.set('instantContinuous', e.target.value );
  },
  'change #slideStep': function(e, template) {
    Session.set('slideStep', e.target.value );
    if(e.target.value == 'step') {
      template.centroidPeriodVisible.set( true );
    } else {
      template.centroidPeriodVisible.set( false );
    }
  },
  'change #centroidPeriod': function(e, template) {
    Session.set('centroidPeriod', e.target.value );
  },
  'change #fixationTrailLength': function(e, template) {
    Session.set('fixationTrailLength', e.target.value );
  },
});

Template.Viewing.destroyed = function(){
  Session.set('updateViewing', false);
}
