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

FlowRouter.route('/test/viewings/:viewingId', {
  name: 'test',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('HomeLayout', { main: 'Test' });
  },
});

FlowRouter.route('/test/viewingsD3/:viewingId', {
  name: 'test',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('HomeLayout', { main: 'D3' });
  },
});
