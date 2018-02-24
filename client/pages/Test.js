Template.Test.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('companies.all');
  });
});


Template.Test.helpers({
  s2Opts() {
    return Companies.find({}).map(function(c) {
      return {
        label: c.name,
        value: c._id
      };
    });
  },
});
