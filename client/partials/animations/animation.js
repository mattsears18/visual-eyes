Template.Animation.onCreated(function() {
  var self = this;
  self.autorun(function() {
    // analysisType = Template.currentData().analysisType;
    // instantContinuous = Template.currentData().instantContinuous;
    // slideStep = Template.currentData().slideStep;
    // centroidPeriod = Template.currentData().centroidPeriod;
    // fixationTrailLength = Template.currentData().fixationTrailLength;
  });
});

Template.Animation.helpers({
  analysisTypeIs: (type) => {
    if(type == Session.get('analysisType')) {
      return true;
    }
  },
  instantContinuousIs: (val) => {
    if(val == Session.get('instantContinuous')) {
      return true;
    }
  },
  slideStepIs: (val) => {
    if(val == Session.get('slideStep')) {
      return true;
    }
  },
});
