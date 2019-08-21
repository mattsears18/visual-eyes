const { FlowRouter } = require('meteor/kadira:flow-router');

// //////////////////////////////////////////////////////////////////////////////
// HOME
// //////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/test', {
  name: 'test',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('HomeLayout', { main: 'Test' });
  },
});

FlowRouter.route('/test/visits/:visitId', {
  name: 'test',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('HomeLayout', { main: 'Test' });
  },
});

FlowRouter.route('/test/visitsD3/:visitId', {
  name: 'test',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('HomeLayout', { main: 'D3' });
  },
});
