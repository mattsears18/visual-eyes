Template.Datafile.onCreated(function() {
  const self = this;
  self.autorun(function() {
    const datafileId = FlowRouter.getParam('datafileId');
    self.subscribe('datafiles.single', datafileId);
  });
});

Template.BreadCrumbs.helpers({
  datafile: () => Datafiles.collection.findOne({ _id: FlowRouter.getParam('datafileId') }),
});

Template.Datafile.helpers({
  datafile: () => Datafiles.collection.findOne({ _id: FlowRouter.getParam('datafileId') }),
});

Template.Datafile.events({
  'click .update-datafile'() {
    Session.set('updateDatafile', true);
  },
});

Template.Datafile.destroyed = function() {
  Session.set('updateDatafile', false);
};
