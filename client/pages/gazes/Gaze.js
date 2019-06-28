Template.Gaze.onCreated(function() {
  this.gaze = new ReactiveVar();

  this.autorun(() => {
    this.gaze.set();
    this.subscribe(
      'gazes.single.withGazepoints',
      Template.currentData().gazeId,
    );

    if (this.subscriptionsReady()) {
      const gaze = Gazes.findOne({
        _id: Template.currentData().gazeId,
      });
      if (gaze && gaze.gazepoints) {
        this.gaze.set(gaze);
      }
    }
  });
});

Template.Gaze.helpers({
  gaze: () => Template.instance().gaze.get(),
  hullParams: () => Template.currentData().hullParams,
});
