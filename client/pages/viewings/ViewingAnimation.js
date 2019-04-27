Template.ViewingAnimation.onCreated(function() {
  this.viewing = new ReactiveVar(Template.instance().data.viewing);
  this.stimulusfile = new ReactiveVar();
  this.hullseries = new ReactiveVar();
  this.hullParams = new ReactiveVar(Template.currentData().hullParams);

  this.autorun(() => {
    this.subscribe('stimulusfiles.byViewingId', this.viewing.get()._id)
    this.hullseries.set()
    this.hullParams.set({
      period: Template.currentData().hullParams.period,
      timestep: Template.currentData().hullParams.timestep,
      includeIncomplete: Template.currentData().hullParams.includeIncomplete,
      pointTrailLength: Template.currentData().hullParams.pointTrailLength,
    })

    if(this.subscriptionsReady()) {
      let stimulusfile = Stimulusfiles.collection.findOne({ _id: this.viewing.get().stimulus().stimulusfileId });
      if(stimulusfile) {
        this.stimulusfile.set(stimulusfile);
        let hullseries = this.viewing.get().getHullseries(this.hullParams.get());

        if(hullseries) {
          this.hullseries.set(hullseries);
          hullseries.getCentroids();
        }
      }
    }
  });
});

Template.ViewingAnimation.helpers({
  viewing: () => {            return Template.instance().viewing.get() },
  stimulusfile: () => {       return Template.instance().hullseries.get() },
  hullseries: () => {         return Template.instance().hullseries.get() },
  layout: () => {             return Template.instance().hullseries.get().getLayout() },
  initialTraces: () => {      return Template.instance().hullseries.get().getTraces({ initial: true }) },
});
