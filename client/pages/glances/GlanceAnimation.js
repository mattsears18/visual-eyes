Template.GazeAnimation.onCreated(function() {
  this.gaze = new ReactiveVar(Template.instance().data.gaze);
  this.stimulusfile = new ReactiveVar();
  this.hullseries = new ReactiveVar();
  this.hullParams = new ReactiveVar(Template.currentData().hullParams);

  this.autorun(() => {
    this.subscribe('stimulusfiles.byGazeId', this.gaze.get()._id);
    this.hullseries.set();
    this.hullParams.set({
      period: Template.currentData().hullParams.period,
      timestep: Template.currentData().hullParams.timestep,
      includeIncomplete: Template.currentData().hullParams.includeIncomplete,
      pointTrailLength: Template.currentData().hullParams.pointTrailLength,
    });

    if (this.subscriptionsReady()) {
      const stimulusfile = Stimulusfiles.collection.findOne({
        _id: this.gaze.get().stimulus().stimulusfileId,
      });
      if (stimulusfile) {
        this.stimulusfile.set(stimulusfile);
        const hullseries = this.gaze.get().getHullseries(this.hullParams.get());

        if (hullseries && hullseries.getHulls().length) {
          this.hullseries.set(hullseries);
          hullseries.getCentroids();
        }
      }
    }
  });
});

Template.GazeAnimation.helpers({
  gaze: () => Template.instance().gaze.get(),
  stimulusfile: () => Template.instance().hullseries.get(),
  hullseries: () => Template.instance().hullseries.get(),
  layout: () => Template.instance()
    .hullseries.get()
    .getLayout(),
  initialTraces: () => Template.instance()
    .hullseries.get()
    .getTraces({ initial: true, hullIndex: 0 }),
});
