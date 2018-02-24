////////////////////////////////////////////////////////////////////////////////
// Submittals Routes
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/submittals', {
  name: 'submittals',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Submittals'});
  }
});

FlowRouter.route('/projects/:projectId/submittals/:submittalId', {
  name: 'submittal',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Submittal'});
  }
});
