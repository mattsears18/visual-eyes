////////////////////////////////////////////////////////////////////////////////
// Specifications Routes
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/specifications', {
  name: 'specifications',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Specifications'});
  }
});

FlowRouter.route('/projects/:projectId/specifications/:specificationId', {
  name: 'specification',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Specification'});
  }
});
