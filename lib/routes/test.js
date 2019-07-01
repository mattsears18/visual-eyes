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

FlowRouter.route('/test/glances/:glanceId', {
  name: 'test',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('HomeLayout', { main: 'Test' });
  },
});

FlowRouter.route('/test/glancesD3/:glanceId', {
  name: 'test',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('HomeLayout', { main: 'D3' });
  },
});
