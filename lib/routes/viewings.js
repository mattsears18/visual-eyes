////////////////////////////////////////////////////////////////////////////////
// Viewings Routes
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/viewings', {
  name: 'viewings',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Viewings'});
  }
});

FlowRouter.route('/studies/:studyId/viewings/:viewingId', {
  name: 'viewing',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Viewing'});
  }
});
