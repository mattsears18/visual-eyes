// //////////////////////////////////////////////////////////////////////////////
// Gazes Routes
// //////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/gazes/:gazeId', {
  name: 'gaze',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', { main: 'Gaze' });
  },
});

FlowRouter.route('/studies/:studyId/analyses/:analysisId/:participantId/:stimulusId/:number', {
  name: 'gaze',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', { main: 'Gazes' });
  },
});
