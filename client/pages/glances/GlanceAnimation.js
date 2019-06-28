Template.GlanceAnimation.onCreated(function() {
  this.glance = new ReactiveVar(Template.instance().data.glance);
  this.stimulusfile = new ReactiveVar();
  this.hullseries = new ReactiveVar();
  this.hullParams = new ReactiveVar(Template.currentData().hullParams);

  this.autorun(() => {
    this.subscribe('stimulusfiles.byGlanceId', this.glance.get()._id);
    this.hullseries.set();
    this.hullParams.set({
      period: Template.currentData().hullParams.period,
      timestep: Template.currentData().hullParams.timestep,
      includeIncomplete: Template.currentData().hullParams.includeIncomplete,
      pointTrailLength: Template.currentData().hullParams.pointTrailLength,
    });

    if (this.subscriptionsReady()) {
      const stimulusfile = Stimulusfiles.collection.findOne({
        _id: this.glance.get().stimulus().stimulusfileId,
      });
      if (stimulusfile) {
        this.stimulusfile.set(stimulusfile);
        const hullseries = this.glance
          .get()
          .getHullseries(this.hullParams.get());

        if (hullseries) {
          this.hullseries.set(hullseries);
          hullseries.getCentroids();
        }
      }
    }
  });
});

Template.GlanceAnimation.helpers({
  glance: () => Template.instance().glance.get(),
  stimulusfile: () => Template.instance().hullseries.get(),
  hullseries: () => Template.instance().hullseries.get(),
  layout: () => Template.instance()
    .hullseries.get()
    .getLayout(),
  initialTraces: () => Template.instance()
    .hullseries.get()
    .getTraces({ initial: true, hullIndex: 0 }),
});
