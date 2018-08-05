import { jStat } from 'jStat';

Template.AnalysisAoi.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);

    var analysisId = FlowRouter.getParam('analysisId');
    analysis = Analyses.findOne(analysisId);

    var aoiId = FlowRouter.getParam('aoiId');
    aoi = Aois.findOne(aoiId);

    self.subscribe('analyses.single', analysisId);
    self.subscribe('aois.single', aoiId);
    self.subscribe('viewings.byAnalysisIdAoiId', analysisId, aoiId);
    self.subscribe('files.datafiles.byStudyId', studyId);
  });
});

Template.BreadCrumbs.helpers({
  analysis: () => {
    return Analyses.findOne();
  },
});

Template.AnalysisAoi.helpers({
  selector() {
    return {
      analysisId: FlowRouter.getParam('analysisId'),
      aoiId: FlowRouter.getParam('aoiId'),
    };
  },
  study: () => {
    return Studies.findOne();
  },
  analysis: () => {
    return Analyses.findOne();
  },
  aoi: () => {
    return Aois.findOne();
  },
  viewings: () => {
    return Viewings.find();
  },
  durationMin: () => {
    return Math.min(...getDurations());
  },
  durationMax: () => {
    return Math.max(...getDurations());
  },
  durationMean: () => {
    return jStat.mean(getDurations());
  },
  durationMedian: () => {
    return jStat.median(getDurations());
  },
  durations: () => {
    return getDurations();
  },
});

Template.Analysis.events({
  'click .update-analysis': function() {
    Session.set('updateAnalysis', true);
  }
});

Template.Analysis.destroyed = function(){
  Session.set('updateAnalysis', false);
}

function getDurations() {
  return Viewings.find().fetch().map(function(viewing) {
    return viewing.duration;
  });
}
