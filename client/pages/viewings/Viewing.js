Template.Viewing.onCreated(function() {
  this.instantContinuousVisible = new ReactiveVar( false );
  this.slideStepVisible = new ReactiveVar( false );
  this.centroidPeriodVisible = new ReactiveVar( false );
  this.fixationTrailLengthVisible = new ReactiveVar( false );
  this.animationVisible = new ReactiveVar( false );
  this.layout = new ReactiveVar();
  this.initialTraces = new ReactiveVar([]);
  this.frames = new ReactiveVar([]);

  Session.set('analysisType', '');
  Session.set('instantContinuous', 'instantaneous');
  Session.set('slideStep', 'slide');
  Session.set('centroidPeriod', 5000);
  Session.set('fixationTrailLength', 5);

  this.autorun(() => {
    var studyId = FlowRouter.getParam('studyId');
    this.subscribe('studies.single', studyId);

    var viewingId = FlowRouter.getParam('viewingId');
    let viewing = Viewings.findOne({});

    this.subscribe('viewings.single.withRecordingPoints', viewingId);
    this.subscribe('participants.byViewingId', viewingId);
    this.subscribe('stimuli.byViewingId', viewingId);
    this.subscribe('stimulusfiles.byViewingId', viewingId);
    this.subscribe('analyses.byViewingId', viewingId);

    if(viewing && this.subscriptionsReady()) {
      if(Session.get('analysisType')) {
        options = {
          analysisType: Session.get('analysisType'),
          instantContinuous: Session.get('instantContinuous'),
          centroidPeriod: Session.get('centroidPeriod'),
          fixationTrailLength: Session.get('fixationTrailLength'),
        };

        this.layout.set(viewing.getLayout(options));
        this.initialTraces.set(viewing.getInitialTraces(options));
        t0 = performance.now();
        this.frames.set(viewing.getFrames(options));
        t1 = performance.now();
        console.log('init time: ' + helpers.formatNumber(t1 - t0) + ' ms');
      }
    }
  });
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
  'change #analysisType': function(e, template) {
    Session.set('analysisType', e.target.value );
    if(e.target.value == 'convexHull') {
      template.animationVisible.set( true );
      template.instantContinuousVisible.set( true );
      template.slideStepVisible.set( true );
      template.fixationTrailLengthVisible.set( true );
    }

    if(e.target.value == 'scanpathLength') {
      template.instantContinuousVisible.set( true );
      template.slideStepVisible.set( true );
    }

    if(e.target.value == 'scanpathVelocity') {
      template.instantContinuousVisible.set( true );
      template.slideStepVisible.set( false );
    }
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
