////////////////////////////////////////////////////////////////////////////////
// Workpackages Routes
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/workpackages', {
  name: 'workpackages',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Workpackages'});
  }
});

FlowRouter.route('/projects/:projectId/workpackages/:workpackageId', {
  name: 'workpackage',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Workpackage'});
  }
});
