Template.Viewing.onCreated(function() {
  this.autorun(() => {
    this.subscribe('viewings.single.withGazepoints', Template.currentData().viewingId);
  });
});

Template.Viewing.helpers({
  viewing: () => { return Viewings.findOne({ _id: Template.currentData().viewingId }) },
  hulls: () => {
    let viewing = Viewings.findOne({ _id: Template.currentData().viewingId });
    if(viewing && viewing.gazepoints) {
      return viewing.getHullseries({
        period: parseInt(Template.currentData().period),
        timestep: parseInt(Template.currentData().timestep),
        includeIncomplete: Template.currentData().includeIncomplete,
        pointTrailLength: Template.currentData().pointTrailLength,
      }).getHulls();
    }
  },
});
