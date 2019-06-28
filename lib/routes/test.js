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

FlowRouter.route('/test/gazes/:gazeId', {
  name: 'test',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('HomeLayout', { main: 'Test' });
  },
});

FlowRouter.route('/test/gazesD3/:gazeId', {
  name: 'test',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('HomeLayout', { main: 'D3' });
  },
});
