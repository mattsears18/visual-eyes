////////////////////////////////////////////////////////////////////////////////
// Images Routes
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/studies/:studyId/images', {
  name: 'images',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Images'});
  }
});

FlowRouter.route('/studies/:studyId/images/:imageId', {
  name: 'image',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Image'});
  }
});
