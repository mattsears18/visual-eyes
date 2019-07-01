// //////////////////////////////////////////////////////////////////////////////
// Glances Routes
// //////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/glances/:glanceId', {
  name: 'glance',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', { main: 'Glance' });
  },
});

FlowRouter.route('/studies/:studyId/analyses/:analysisId/:participantId/:stimulusId/:number', {
  name: 'glance',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', { main: 'Glances' });
  },
});
