////////////////////////////////////////////////////////////////////////////////
// Analyses Routes
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/analyses', {
  name: 'analyses',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Analyses'});
  }
});

FlowRouter.route('/studies/:studyId/analyses/:analysisId', {
  name: 'analysis',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Analysis'});
  }
});
