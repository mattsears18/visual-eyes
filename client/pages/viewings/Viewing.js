Template.Viewing.onCreated(function() {
  this.viewing = new ReactiveVar();

  this.autorun(() => {
    this.viewing.set();
    this.subscribe('viewings.single.withGazepoints', Template.currentData().viewingId);

    if (this.subscriptionsReady()) {
      const viewing = Viewings.findOne({ _id: Template.currentData().viewingId });
      if (viewing && viewing.gazepoints) {
        this.viewing.set(viewing);
      }
    }
  });
});

Template.Viewing.helpers({
  viewing: () => Template.instance().viewing.get(),
  hullParams: () => Template.currentData().hullParams,
});
