Template.VisitAnimation.onCreated(function() {
  this.visit = new ReactiveVar(Template.instance().data.visit);
  this.stimulusfile = new ReactiveVar();
  this.hullseries = new ReactiveVar();
  this.hullParams = new ReactiveVar(Template.currentData().hullParams);

  this.autorun(() => {
    this.subscribe('stimulusfiles.byVisitId', this.visit.get()._id);
    this.hullseries.set();
    this.hullParams.set({
      period: Template.currentData().hullParams.period,
      timestep: Template.currentData().hullParams.timestep,
      includeIncomplete: Template.currentData().hullParams.includeIncomplete,
      pointTrailLength: Template.currentData().hullParams.pointTrailLength,
    });

    if (this.subscriptionsReady()) {
      const stimulusfile = Stimulusfiles.collection.findOne({
        _id: this.visit.get().stimulus().stimulusfileId,
      });
      if (stimulusfile) {
        this.stimulusfile.set(stimulusfile);
        const hullseries = this.visit
          .get()
          .getHullseries(this.hullParams.get());

        if (hullseries && hullseries.getHulls().length) {
          this.hullseries.set(hullseries);
          hullseries.getCentroids();
        }
      }
    }
  });
});

Template.VisitAnimation.helpers({
  visit: () => Template.instance().visit.get(),
  stimulusfile: () => Template.instance().stimulusfile.get(),
  hullseries: () => Template.instance().hullseries.get(),
  layout: () => Template.instance()
    .hullseries.get()
    .getLayout(),
  initialTraces: () => Template.instance()
    .hullseries.get()
    .getTraces({ initial: true, hullIndex: 0 }),
});
