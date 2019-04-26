Template.ViewingAnimation.onCreated(function() {
  this.viewing = new ReactiveVar(Template.instance().data.viewing);
  this.period = new ReactiveVar(5000);
  this.timestep = new ReactiveVar(0);
  this.includeIncomplete = new ReactiveVar(false);
  this.pointTrailLength = new ReactiveVar(10);
  this.hullseries = new ReactiveVar();

  this.autorun(() => {
    console.log('autorun');
    this.subscribe('stimulusfiles.byViewingId', this.viewing.get()._id);
    this.hullseries.set();

    if(this.subscriptionsReady()) {
      let stimulusfile = Stimulusfiles.collection.findOne({ _id: this.viewing.get().stimulus().stimulusfileId });
      if(stimulusfile) {
        let hullseries = this.viewing.get().getHullseries({
          period: this.period.get(),
          timestep: this.timestep.get(),
          includeIncomplete: this.includeIncomplete.get(),
          pointTrailLength: this.pointTrailLength.get(),
        });

        if(hullseries) {
          this.hullseries.set(hullseries);
        }
      }
    }
  });
});

Template.ViewingAnimation.helpers({
  viewing: () => {            return Template.instance().viewing.get() },
  period: () => {             return Template.instance().period.get() },
  timestep: () => {           return Template.instance().timestep.get() },
  includeIncomplete: () => {  return Template.instance().includeIncomplete.get() },
  pointTrailLength: () => {   return Template.instance().pointTrailLength.get() },
  hullseries: () => {         return Template.instance().hullseries.get() },
});

Template.ViewingAnimation.events({
  'change .reactive': (e, t) => {
    let value;

    if(e.target.type == 'checkbox') {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }

    t[e.target.id].set(value);
  },
})
