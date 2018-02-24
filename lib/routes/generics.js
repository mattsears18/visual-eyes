////////////////////////////////////////////////////////////////////////////////
// Generics Routes
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/generics', {
  name: 'generics',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Generics'});
  }
});

FlowRouter.route('/generics/:genericId', {
  name: 'generic',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Generic'});
  }
});
