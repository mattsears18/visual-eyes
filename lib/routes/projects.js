////////////////////////////////////////////////////////////////////////////////
// Projects Routes
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/projects', {
  name: 'projects',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Projects'});
  }
});

FlowRouter.route('/projects/:projectId', {
  name: 'project',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Project'});
  }
});
