Template.Glance.onCreated(function() {
  this.glance = new ReactiveVar();

  this.autorun(() => {
    this.glance.set();
    this.subscribe(
      'glances.single.withGazepoints',
      Template.currentData().glanceId,
    );

    if (this.subscriptionsReady()) {
      const glance = Glances.findOne({
        _id: Template.currentData().glanceId,
      });
      if (glance && glance.gazepoints) {
        this.glance.set(glance);
      }
    }
  });
});

Template.Glance.helpers({
  glance: () => Template.instance().glance.get(),
  hullParams: () => Template.currentData().hullParams,
});
