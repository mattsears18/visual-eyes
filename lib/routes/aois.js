////////////////////////////////////////////////////////////////////////////////
// Aois Routes
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/aois', {
  name: 'aois',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Aois'});
  }
});

FlowRouter.route('/aois/:aoiId', {
  name: 'aoi',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Aoi'});
  }
});
