////////////////////////////////////////////////////////////////////////////////
// HOME
////////////////////////////////////////////////////////////////////////////////
FlowRouter.route('/', {
  name: 'home',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render('HomeLayout', {main: 'Home'});
  }
});


////////////////////////////////////////////////////////////////////////////////
// 404
////////////////////////////////////////////////////////////////////////////////
// FlowRouter.notFound = {
//   action: function() {
//     FlowRouter.go('home');
//   }
// };