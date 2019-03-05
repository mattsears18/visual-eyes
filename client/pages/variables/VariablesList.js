Template.VariablesList.helpers({
  study: () => {
    return Studies.findOne();
  },
  variables: () => {
    return Variables.find({}, { sort: { name: 1 }});
  },
});

Template.VariablesList.events({
  'click .new-variable': function() {
    Session.set('newVariable', true);
  },
  'click .new-variablefile': function() {
    Session.set('newVariablefile', true);
  }
});

Template.VariablesList.destroyed = function(){
  Session.set('newVariable', false);
}
