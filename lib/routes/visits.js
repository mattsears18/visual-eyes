const { FlowRouter } = require('meteor/kadira:flow-router');
// //////////////////////////////////////////////////////////////////////////////
// Visits Routes
// //////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/visits/:visitId', {
  name: 'visit',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', { main: 'Visit' });
  },
});

FlowRouter.route(
  '/studies/:studyId/analyses/:analysisId/participants/:participantId/visits/:number',
  {
    name: 'visit',
    action(params, queryParams) {
      GAnalytics.pageview();
      BlazeLayout.render('MainLayout', { main: 'Visits' });
    },
  },
);
