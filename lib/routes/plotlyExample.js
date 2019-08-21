const { FlowRouter } = require('meteor/kadira:flow-router');

FlowRouter.route('/plotlyExample', {
  name: 'plotlyExample',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('MainLayout', { main: 'PlotlyExample' });
  },
});
