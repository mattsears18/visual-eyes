Template.Company.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var companyId = FlowRouter.getParam('companyId');
    self.subscribe('companies.single', companyId);
    self.subscribe('placesByCompany', companyId);
  });
});

Template.Company.helpers({
  company: () => {
    return Companies.findOne();
  },
});

Template.BreadCrumbs.helpers({
  company: () => {
    return Companies.findOne();
  },
});

Template.Company.events({
  'click .update-company': function() {
    Session.set('updateCompany', true);
  }
});

Template.Company.destroyed = function(){
  Session.set('updateCompany', false);
}
