import Jobs from '../../../collections/Jobs/Jobs';

Template.Analysis.onCreated(function() {
  var self = this;

  self.selector = new ReactiveDict();

  self.selector.set( 'datafileIds', [] );
  self.selector.set( 'aoiIds', [] );

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

    if(self.subscriptionsReady()) {
      datafilesArr = Datafiles.find({}).fetch();
      datafileIds = datafilesArr.map(function(datafile) { return datafile._id; });
      self.selector.set( 'datafileIds', datafileIds );

      aoisArr = Aois.find({}).fetch();
      aoiIds = aoisArr.map(function(aoi) { return aoi._id; });
      self.selector.set( 'aoiIds', aoiIds );
    }
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
      datafileId: { $in: datafileIds },
      aoiId:      { $in: aoiIds },
    };

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
  makeViewingsJobsProgress: () => {
    return getViewingsJobsProgress();
  },
  makeViewingsJobsComplete: () => {
    return getViewingsJobsProgress() == 100;
  },
});

Template.Analysis.events({
  'click .update-analysis': function() {
    Session.set('updateAnalysis', true);
  },
  'click .selector': function(e, template) {
    $target = $(e.target);
    id = $target.data('id');

    if($target.hasClass('datafile')) {
      collectionIds = 'datafileIds';
    } else if ($target.hasClass('aoi')) {
      collectionIds = 'aoiIds';
    }

    ids = template.selector.get( collectionIds );
    template.selector.set( collectionIds,
      helpers.toggleInArray(ids, id)
    );
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
