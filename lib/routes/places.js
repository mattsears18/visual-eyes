////////////////////////////////////////////////////////////////////////////////
// Places Routes
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/places', {
  name: 'places',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Places'});
  }
});

FlowRouter.route('/places/:placeId', {
  name: 'place',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Place'});
  }
});
