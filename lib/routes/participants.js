////////////////////////////////////////////////////////////////////////////////
// Participants Routes
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/participants', {
  name: 'participants',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('StudyLayout', {main: 'Participants'});
  }
});

FlowRouter.route('/studies/:studyId/participants/:participantId', {
  name: 'participant',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Participant'});
  }
});

FlowRouter.route('/studies/:studyId/participants/:participantId', {
  name: 'participant',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Participant'});
  }
});

FlowRouter.route('/studies/:studyId/analyses/:analysisId/participants/:participantId', {
  name: 'analysisParticipant',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'AnalysisParticipant'});
  }
});
