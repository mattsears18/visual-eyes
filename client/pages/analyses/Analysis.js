import { jStat } from 'jStat';
import Jobs from '../../../collections/Jobs/Jobs';

Template.Analysis.onCreated(function() {
  var self = this;

  self.selector = new ReactiveDict();

  self.selector.set( 'datafileIds', [] );
  self.selector.set( 'aoiIds', [] );
  self.selector.set( 'selector', {} );

  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);

    var analysisId = FlowRouter.getParam('analysisId');
    analysis = Analyses.findOne(analysisId);

    self.subscribe('analyses.single', analysisId);
    self.subscribe('viewings.byAnalysisId', analysisId);
    self.subscribe('datafiles.byAnalysisId', analysisId);
    self.subscribe('aois.byAnalysisId', analysisId);
    self.subscribe('jobs.analyses.makeViewings.byAnalysisId', analysisId);

    if(self.subscriptionsReady()) { updateSelectors(self); }
  });
});

Template.BreadCrumbs.helpers({
  analysis: () => {
    return Analyses.findOne();
  },
});

Template.Analysis.helpers({
  analysis: () => {
    return Analyses.findOne();
  },
  viewings: () => {
    template = Template.instance();
    datafileIds = template.selector.get('datafileIds');
    aoiIds = template.selector.get('aoiIds');

    selector = {
      analysisId: FlowRouter.getParam('analysisId'),
      datafileId: { $in: datafileIds },
      aoiId:      { $in: aoiIds },
    };

    template.selector.set('selector', selector);

    return Viewings.find(selector);
  },
  study: () => {
    return Studies.findOne();
  },
  aois: () => {
    return Aois.find();
  },
  datafiles: () => {
    return Datafiles.find();
  },
  showDatafileIds: function() {
    return Template.instance().selector.get('datafileIds');
  },
  showAoiIds: function() {
    return Template.instance().selector.get('aoiIds');
  },
  selector: function() {
    return Template.instance().selector.get('selector');
  },
  makeViewingsJobsProgress: () => {
    return getViewingsJobsProgress();
  },
  makeViewingsJobsComplete: () => {
    return getViewingsJobsProgress() == 100;
  },

  durations: () => {              return getDurations(); },
  durationMin: () => {            return Math.min(...getDurations()); },
  durationMax: () => {            return Math.max(...getDurations()); },
  durationRange: () => {          return jStat.range(getDurations()); },
  durationMean: () => {           return jStat.mean(getDurations()); },
  durationMedian: () => {         return jStat.median(getDurations()); },
  durationSkewness: () => {       return jStat.skewness(getDurations()); },
  durationKurtosis: () => {       return jStat.kurtosis(getDurations()); },

  viewingCounts: () => {          return getViewingCounts(); },
  viewingCountsMin: () => {       return Math.min(...getViewingCounts()); },
  viewingCountsMax: () => {       return Math.max(...getViewingCounts()); },
  viewingCountsRange: () => {     return jStat.range(getViewingCounts()); },
  viewingCountsMean: () => {      return jStat.mean(getViewingCounts()); },
  viewingCountsMedian: () => {    return jStat.median(getViewingCounts()); },
  viewingCountsSkewness: () => {  return jStat.skewness(getViewingCounts()); },
  viewingCountsKurtosis: () => {  return jStat.kurtosis(getViewingCounts()); },

  viewingCountsData: () => {
    return [{
      x: getViewingCounts(),
      type: 'histogram',
      autobinx: false,
      xbins: {
        start: 0.5,
        end: Math.max(...getViewingCounts()),
        size: 1
      },
    }];
  },
});

Template.Analysis.events({
  'click .update-analysis': function() {
    Session.set('updateAnalysis', true);
  },
  'click .selector': function(e, template) {
    $target = $(e.target);
    $target.toggleClass('label-primary');
    $target.toggleClass('label-default');

    updateSelectors(template);
  },
  'click .toggle-all': function(e, template) {
    $toggle = $(e.target);
    $toggle.toggleClass('label-primary');
    $toggle.toggleClass('label-default');

    $selectors = $toggle.closest('.selector-set').find('.selector');

    if($toggle.hasClass('label-primary')) {
      $selectors.addClass('label-default');
      $selectors.removeClass('label-primary');
    } else if($toggle.hasClass('label-default')) {
      $selectors.addClass('label-primary');
      $selectors.removeClass('label-default');
    }

    updateSelectors(template)
  },
});

Template.Analysis.destroyed = function(){
  Session.set('updateAnalysis', false);
}

function getViewingsJobsProgress() {
  progress = 0;

  jobsCount = Jobs.find().count();
  jobsCompletedCount = Jobs.find({ status: 'completed' }).count();

  if(jobsCount && jobsCompletedCount) {
    progress = helpers.formatNumber(jobsCompletedCount / jobsCount * 100);
  }

  return progress;
}

function updateSelectors(template) {
  $datafiles = $('.selector.datafile.label-primary');
  datafileIds = $datafiles.map(function() {
    return $(this).data('id');
  }).toArray();

  template.selector.set( 'datafileIds', datafileIds );

  $aois = $('.selector.aoi.label-primary');
  aoiIds = $aois.map(function() {
    return $(this).data('id');
  }).toArray();

  template.selector.set( 'aoiIds', aoiIds );
}

function getDurations() {
  selector = Template.instance().selector.get('selector');
  return Viewings.find(selector, { sort: { duration: 1 }}).fetch().map(function(viewing) {
    return viewing.duration;
  });
}

function getViewingCounts() {
  selector = Template.instance().selector.get('selector');
  viewings = Viewings.find(selector, { sort: { duration: 1 }}).fetch();

  var list = [ { user_id: 301, alert_id: 199, deal_id: 32243 },
    { user_id: 301, alert_id: 200, deal_id: 32243 },
    { user_id: 301, alert_id: 200, deal_id: 107293 },
    { user_id: 301, alert_id: 200, deal_id: 277470 } ];

  var groups = _.groupBy(viewings, function(viewing){
    return viewing.datafileId + '#' + viewing.aoiId;
  });

  var counts = _.map(groups, function(group){
    return group.length;
  });

  return counts;
}
