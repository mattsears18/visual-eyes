////////////////////////////////////////////////////////////////////////////////
// Recordings Routes
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/recordings', {
  name: 'recordings',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Recordings'});
  }
});

FlowRouter.route('/studies/:studyId/recordings/:recordingId', {
  name: 'recording',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Recording'});
  }
});
