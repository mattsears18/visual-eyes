////////////////////////////////////////////////////////////////////////////////
// Datafiles Routes
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/datafiles', {
  name: 'datafiles',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('StudyLayout', {main: 'Datafiles'});
  }
});

FlowRouter.route('/studies/:studyId/datafiles/:datafileId', {
  name: 'datafile',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('StudyLayout', {main: 'Datafile'});
  }
});
