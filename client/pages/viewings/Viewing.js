Template.Viewing.onCreated(function() {
  this.autorun(() => {
    this.subscribe('viewings.single.withGazepoints', Template.currentData().viewingId);
    this.subscribe('hullseries.byViewingId', Template.currentData().viewingId);
  });
});

Template.Viewing.helpers({
  viewing: () => { return Viewings.findOne({ _id: Template.currentData().viewingId }) },
  hullseries: () => {
    return Hullseries.findOne({
      viewingId: Template.currentData().viewingId,
      period: parseInt(Template.currentData().period),
      timestep: parseInt(Template.currentData().timestep),
      includeIncomplete: Template.currentData().includeIncomplete,
    });
  },
});


Template.Viewing.events({
  'click .generate-animation': (e, t) => {
    let viewing = Viewings.findOne({ _id: Template.currentData().viewingId });
    let hullseries = viewing.getHullseries({
      period: parseInt(Template.currentData().period),
      timestep: parseInt(Template.currentData().timestep),
      includeIncomplete: Template.currentData().includeIncomplete,
    });
  },
})
