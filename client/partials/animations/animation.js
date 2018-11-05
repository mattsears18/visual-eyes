Template.Animation.onCreated(function() {
  var self = this;
  self.autorun(function() {
    analysisType = Template.currentData().analysisType;
    instantContinuous = Template.currentData().instantContinuous;
    slideStep = Template.currentData().slideStep;
  });
});


Template.Animation.helpers({
  analysisTypeIs: (type) => {
    if(type == analysisType) {
      return true;
    }
  },
  instantContinuousIs: (val) => {
    if(val == instantContinuous) {
      return true;
    }
  },
  slideStepIs: (val) => {
    if(val == slideStep) {
      return true;
    }
  },
});
