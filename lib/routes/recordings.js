////////////////////////////////////////////////////////////////////////////////
// Recordings Routes
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/recordings', {
  name: 'recordings',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Recordings'});
  }
});

FlowRouter.route('/recordings/:recordingId', {
  name: 'recording',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Recording'});
  }
});
