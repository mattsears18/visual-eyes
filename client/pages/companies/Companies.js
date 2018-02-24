Template.Companies.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('companies.all');
  });
});

Template.Companies.helpers({
  companies: () => { return Companies.find(); },
});

Template.Companies.events({
  'click .new-company': function() {
    Session.set('newCompany', true);
  }
});

Template.Companies.destroyed = function(){
  Session.set('newCompany', false);
}
