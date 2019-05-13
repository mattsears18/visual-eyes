// //////////////////////////////////////////////////////////////////////////////
// Studies Routes
// //////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies', {
  name: 'studies',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', { main: 'Studies' });
  },
});

FlowRouter.route('/studies/:studyId', {
  name: 'study',
  action(params, queryParams) {
    GAnalytics.pageview();
    // BlazeLayout.render('MainLayout', {main: 'Study'});

    // just redirect to datafiles for now...
    FlowRouter.go(`/studies/${params.studyId}/datafiles`);
  },
});
