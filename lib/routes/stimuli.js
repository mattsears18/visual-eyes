////////////////////////////////////////////////////////////////////////////////
// Stimuli Routes
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/stimuli', {
  name: 'stimuli',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('StudyLayout', {main: 'Stimuli'});
  }
});

FlowRouter.route('/studies/:studyId/stimuli/:stimulusId', {
  name: 'stimulus',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Stimulus'});
  }
});
