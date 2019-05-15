Template.VariablesList.helpers({
  study: () => Studies.findOne(),
  variables: () => Variables.find({}, { sort: { name: 1 } }),
});

Template.VariablesList.events({
  'click .new-variable'() {
    Session.set('newVariable', true);
  },
  'click .new-variablefile'() {
    Session.set('newVariablefile', true);
  },
  'click .delete-variable'(event) {
    if (confirm(`Really delete "${event.target.dataset.variablename}"?`)) {
      Variables.remove({ _id: event.target.dataset.variableid });
    }
  },
});

Template.VariablesList.destroyed = function() {
  Session.set('newVariable', false);
};
