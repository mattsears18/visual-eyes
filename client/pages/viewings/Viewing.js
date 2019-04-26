Template.Viewing.onCreated(function() {
  this.viewing = new ReactiveVar();

  this.autorun(() => {
    this.viewing.set();
    this.subscribe('viewings.single.withGazepoints', Template.currentData().viewingId);

    if(this.subscriptionsReady()) {
      let viewing = Viewings.findOne({ _id: Template.currentData().viewingId });
      if(viewing && viewing.gazepoints) {
        this.viewing.set(viewing);
      }
    }
  });
});

Template.Viewing.helpers({
  viewing: () => {    return Template.instance().viewing.get() },
  hullParams: () => { return Template.currentData().hullParams },
});
