const { FlowRouter } = require('meteor/kadira:flow-router');
// //////////////////////////////////////////////////////////////////////////////
// Analyses Routes
// //////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/analyses', {
  name: 'analyses',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('StudyLayout', { main: 'Analyses' });
  },
});

FlowRouter.route('/studies/:studyId/analyses/:analysisId', {
  name: 'analysis',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('StudyLayout', { main: 'Analysis' });
  },
});

FlowRouter.route('/studies/:studyId/analyses/:analysisId/aois/:aoiId', {
  name: 'analysisAoi',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', { main: 'AnalysisAoi' });
  },
});

FlowRouter.route(
  '/studies/:studyId/analyses/:analysisId/datafiles/:datafileId',
  {
    name: 'analysisDatafile',
    action(params, queryParams) {
      GAnalytics.pageview();
      BlazeLayout.render('MainLayout', { main: 'AnalysisDatafile' });
    },
  },
);
