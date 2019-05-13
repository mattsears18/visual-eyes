Template.Exports.onCreated(function() {
  this.exportType = ReactiveVar();
  this.analysisId = ReactiveVar();
  this.analysisSelectorVisible = new ReactiveVar(false);
  this.downloadButtonVisible = new ReactiveVar(false);

  this.autorun(() => {
    if (this.analysisId.get()) {
      this.subscribe('viewings.byAnalysisId', this.analysisId.get());
    }
  });
});

Template.Exports.helpers({
  analysisSelectorVisible: () => Template.instance().analysisSelectorVisible.get(),
  downloadButtonVisible: () => Template.instance().downloadButtonVisible.get(),
});

Template.Exports.events({
  'change .export-type': (e, t) => {
    const exportType = e.target.value;
    t.exportType.set(e.target.value);

    if (
      exportType === 'allParticipantsSingle'
      || exportType === 'allParticipantsIndividual'
      || exportType === 'allViewingsSingle'
      || exportType === 'allViewingsIndividual'
    ) {
      t.analysisSelectorVisible.set(true);
    } else {
      t.analysisSelectorVisible.set(false);
    }
  },
  'change .analysis-selector': (e, t) => {
    const analysisId = e.target.value;
    t.analysisId.set(analysisId);

    if (analysisId) {
      t.downloadButtonVisible.set(true);
    } else {
      t.downloadButtonVisible.set(false);
    }
  },
  'click .download-button': (e, t) => {
    console.log('balls');
    console.log(t.exportType.get());
    if (t.analysisId.get()) {
      const analysis = Analyses.findOne({ _id: t.analysisId.get() });

      if (t.exportType.get() === 'allParticipantsSingle') {
        console.log('analysis.saveCSVParticipants()');
        analysis.saveCSVParticipants();
      } else if (t.exportType.get() === 'allParticipantsIndividual') {
        console.log('analysis.saveCSVParticipants({ individual: true })');
        analysis.saveCSVParticipants();
      }
    }
  },
});
