////////////////////////////////////////////////////////////////////////////////
// Companies Routes
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/companies', {
  name: 'companies',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Companies'});
  }
});

FlowRouter.route('/companies/:companyId', {
  name: 'company',
  action(params, queryParams) {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', {main: 'Company'});
  }
});
