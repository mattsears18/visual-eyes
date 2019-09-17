const { FlowRouter } = require('meteor/kadira:flow-router');
// //////////////////////////////////////////////////////////////////////////////
// Eyeevents Routes
// //////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/participants/:participantId/eyeevents', {
  name: 'eyeevents',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('StudyLayout', { main: 'Eyeevents' });
  },
});
