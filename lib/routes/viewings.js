////////////////////////////////////////////////////////////////////////////////
// Viewings Routes
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/viewings/:viewingId', {
  name: 'viewing',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Viewing'});
  }
});

FlowRouter.route('/studies/:studyId/analyses/:analysisId/:participantId/:stimulusId/:number', {
  name: 'viewing',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', { main: 'Viewings' });
  }
});
