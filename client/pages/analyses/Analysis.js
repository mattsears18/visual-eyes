import { jStat } from 'jStat';
import Jobs from '../../../collections/Jobs/Jobs';

var participantSub;
var stimuliSub;

Template.Analysis.onCreated(function() {
  var self = this;

  self.selector = new ReactiveDict();

  self.selector.set( 'participantIds', [] );
  self.selector.set( 'stimulusIds', [] );
  self.selector.set( 'selector', {} );

  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);
    self.subscribe('aois.byStudyId', studyId);
    self.subscribe('variables.byStudyId', studyId);
    self.subscribe('datafiles.byStudyId', studyId);

    var analysisId = FlowRouter.getParam('analysisId');
    self.subscribe('analyses.single', analysisId);
    self.subscribe('viewings.byAnalysisId', analysisId);
    participantSub = self.subscribe('participants.byAnalysisId', analysisId);
    stimuliSub = self.subscribe('stimuli.byAnalysisId', analysisId);
    self.subscribe('jobs.analyses.makeViewings.byAnalysisId', analysisId);
    self.subscribe('jobs.viewings.saveAverageSlideHullArea.byAnalysisId', analysisId);

    if(self.subscriptionsReady()) { updateSelectors(self); }
  });
});

Template.UpdateAnalysis.destroyed = function(){
  participantSub.stop();
  stimuliSub.stop();
}

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
    participantIds = template.selector.get('participantIds');
    stimulusIds = template.selector.get('stimulusIds');

    selector = {
      analysisId: FlowRouter.getParam('analysisId'),
      participantId: { $in: participantIds },
      stimulusId:      { $in: stimulusIds },
    };

    template.selector.set('selector', selector);

    return Viewings.find(selector);
  },
  study: () => {
    return Studies.findOne();
  },
  stimuli: () => {
    return Stimuli.find();
  },
  participants: () => {
    return Participants.find();
  },
  showParticipantIds: function() {
    return Template.instance().selector.get('participantIds');
  },
  showStimulusIds: function() {
    return Template.instance().selector.get('stimulusIds');
  },
  selector: function() {
    return Template.instance().selector.get('selector');
  },
});


Template.Analysis.events({
  'click .download-as-csv':function(){
    Meteor.call('analyses.saveCSV', { analysisId: FlowRouter.getParam('analysisId') });
  },
  'click .download-viewings-as-csv':function(e, template){
    Meteor.call('analyses.saveViewingsCSV', { analysisId: FlowRouter.getParam('analysisId') });
  },
  'click .reprocess-analysis': function() {
    Meteor.call('analyses.makeParticipantJobs', { analysisId: FlowRouter.getParam('analysisId') });
  },
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
  $participants = $('.selector.participant.label-primary');
  participantIds = $participants.map(function() {
    return $(this).data('id');
  }).toArray();

  template.selector.set( 'participantIds', participantIds );

  $stimuli = $('.selector.stimulus.label-primary');
  stimulusIds = $stimuli.map(function() {
    return $(this).data('id');
  }).toArray();

  template.selector.set( 'stimulusIds', stimulusIds );
}
