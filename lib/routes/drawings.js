////////////////////////////////////////////////////////////////////////////////
// Drawings Routes
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/drawings', {
  name: 'drawings',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Drawings'});
  }
});

FlowRouter.route('/projects/:projectId/drawings/:drawingId', {
  name: 'drawing',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Drawing'});
  }
});
