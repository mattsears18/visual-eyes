// //////////////////////////////////////////////////////////////////////////////
// Variables Routes
// //////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/variables', {
  name: 'variables',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('StudyLayout', { main: 'Variables' });
  },
});

FlowRouter.route('/studies/:studyId/variables/:variableId', {
  name: 'variable',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', { main: 'Variable' });
  },
});
