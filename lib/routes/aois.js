const { FlowRouter } = require('meteor/kadira:flow-router');
// //////////////////////////////////////////////////////////////////////////////
// Aois Routes
// //////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/aois', {
  name: 'aois',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', { main: 'Aois' });
  },
});

FlowRouter.route('/studies/:studyId/aois/:aoiId', {
  name: 'aoi',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', { main: 'Aoi' });
  },
});
