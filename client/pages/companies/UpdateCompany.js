Template.UpdateCompany.events({
  'click .fa-close': function() {
    Session.set('updateCompany', false);
  }
});

AutoForm.hooks({
  updateCompanyForm: {
    onSuccess: function(formType, result) {
      Session.set('updateCompany', false);
    },
  }
});

Template.UpdateCompany.helpers({
  deleteOnSuccess: function() {
    return function() {
      FlowRouter.go('/companies');
    }
  },
  deleteBeforeRemove: function() {
    //TODO replace this alert with a modal
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.name + '"?')) {
        this.remove();
      }
    };
  },
});
