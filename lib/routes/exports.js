const { FlowRouter } = require('meteor/kadira:flow-router');
// //////////////////////////////////////////////////////////////////////////////
// Exports Routes
// //////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/exports', {
  name: 'exports',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('StudyLayout', { main: 'Exports' });
  },
});
