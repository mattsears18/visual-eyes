Template.Datafile.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var datafileId = FlowRouter.getParam('datafileId');
    self.subscribe('datafiles.single', datafileId);
  });
});

Template.BreadCrumbs.helpers({
  datafile: () => {
    return Datafiles.findOne();
  },
});

Template.Datafile.helpers({
  datafile: () => {
    return Datafiles.findOne();
  },
});

Template.Datafile.events({
  'click .update-datafile': function() {
    Session.set('updateDatafile', true);
  }
});

Template.Datafile.destroyed = function(){
  Session.set('updateDatafile', false);
}
