Template.Visit.onCreated(function() {
  this.visit = new ReactiveVar();

  this.autorun(() => {
    this.visit.set();
    this.subscribe(
      'visits.single.withFixations',
      Template.currentData().visitId,
    );

    if (this.subscriptionsReady()) {
      const visit = Visits.findOne({
        _id: Template.currentData().visitId,
      });
      if (visit && visit.gazepoints) {
        this.visit.set(visit);
      }
    }
  });
});

Template.Visit.helpers({
  visit: () => Template.instance().visit.get(),
  hullParams: () => Template.currentData().hullParams,
});
