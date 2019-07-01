import { jStat } from 'jStat';
import Jobs from '../../../collections/Jobs/Jobs';

let participantSub;
let stimuliSub;

Template.Analysis.onCreated(function() {
  const self = this;

  self.selector = new ReactiveDict();

  self.selector.set('participantIds', []);
  self.selector.set('stimulusIds', []);
  self.selector.set('selector', {});

  self.autorun(function() {
    const studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);
    self.subscribe('aois.byStudyId', studyId);
    self.subscribe('variables.byStudyId', studyId);
    self.subscribe('datafiles.byStudyId', studyId);

    const analysisId = FlowRouter.getParam('analysisId');
    self.subscribe('analyses.single', analysisId);
    self.subscribe('glances.byAnalysisId', analysisId);
    participantSub = self.subscribe('participants.byAnalysisId', analysisId);
    stimuliSub = self.subscribe('stimuli.byAnalysisId', analysisId);

    const analysis = Analyses.findOne({});
    if (analysis && analysis.status === 'processing') {
      self.subscribe('jobs.byAnalysisId', analysisId);
    }

    if (self.subscriptionsReady()) {
      updateSelectors(self);
    }
  });
});

Template.UpdateAnalysis.destroyed = function() {
  participantSub.stop();
  stimuliSub.stop();
};

Template.BreadCrumbs.helpers({
  analysis: () => Analyses.findOne(),
});

Template.Analysis.helpers({
  analysis: () => Analyses.findOne(),
  glances: () => {
    template = Template.instance();
    participantIds = template.selector.get('participantIds');
    stimulusIds = template.selector.get('stimulusIds');

    selector = {
      analysisId: FlowRouter.getParam('analysisId'),
      participantId: { $in: participantIds },
      stimulusId: { $in: stimulusIds },
    };

    template.selector.set('selector', selector);

    return Glances.find(selector);
  },
  study: () => Studies.findOne(),
  stimuli: () => Stimuli.find(),
  participants: () => Participants.find(),
  showParticipantIds() {
    return Template.instance().selector.get('participantIds');
  },
  showStimulusIds() {
    return Template.instance().selector.get('stimulusIds');
  },
  selector() {
    return Template.instance().selector.get('selector');
  },
});

Template.Analysis.events({
  'click .download-as-csv'(event, templateInstance) {
    const analysis = Analyses.findOne();
    analysis.saveCSV({
      groupBy: 'participant',
      individual: 'false',
    });
  },
  'click .download-glances-as-csv'(e, template) {
    const analysis = Analyses.findOne();
    analysis.saveCSVGlances();
  },
  'click .reprocess-analysis'() {
    Meteor.call('analyses.makeGlanceJobsJob', {
      analysisId: FlowRouter.getParam('analysisId'),
    });
  },
  'click .update-analysis'() {
    Session.set('updateAnalysis', true);
  },
  'click .selector'(e, template) {
    $target = $(e.target);
    $target.toggleClass('label-primary');
    $target.toggleClass('label-default');

    updateSelectors(template);
  },
  'click .toggle-all'(e, template) {
    $toggle = $(e.target);
    $toggle.toggleClass('label-primary');
    $toggle.toggleClass('label-default');

    $selectors = $toggle.closest('.selector-set').find('.selector');

    if ($toggle.hasClass('label-primary')) {
      $selectors.addClass('label-default');
      $selectors.removeClass('label-primary');
    } else if ($toggle.hasClass('label-default')) {
      $selectors.addClass('label-primary');
      $selectors.removeClass('label-default');
    }

    updateSelectors(template);
  },
});

Template.Analysis.destroyed = function() {
  Session.set('updateAnalysis', false);
};

function getGlancesJobsProgress() {
  progress = 0;

  jobsCount = Jobs.find().count();
  jobsCompletedCount = Jobs.find({ status: 'completed' }).count();

  if (jobsCount && jobsCompletedCount) {
    progress = helpers.formatNumber((jobsCompletedCount / jobsCount) * 100);
  }

  return progress;
}

function updateSelectors(template) {
  $participants = $('.selector.participant.label-primary');
  participantIds = $participants
    .map(function() {
      return $(this).data('id');
    })
    .toArray();

  template.selector.set('participantIds', participantIds);

  $stimuli = $('.selector.stimulus.label-primary');
  stimulusIds = $stimuli
    .map(function() {
      return $(this).data('id');
    })
    .toArray();

  template.selector.set('stimulusIds', stimulusIds);
}
