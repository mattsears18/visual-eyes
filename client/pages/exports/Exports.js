Template.Exports.onCreated(function() {
  this.exportType = ReactiveVar();
  this.analysisId = ReactiveVar();
  this.analysisSelectorVisible = new ReactiveVar(false);
  this.downloadButtonVisible = new ReactiveVar(false);
  this.samplingStepVisible = new ReactiveVar(false);
  this.samplingStep = new ReactiveVar(100);

  this.autorun(() => {
    if (this.analysisId.get()) {
      this.subscribe('glances.byAnalysisId', this.analysisId.get());
    }
  });
});

Template.Exports.helpers({
  analysisSelectorVisible: () => Template.instance().analysisSelectorVisible.get(),
  downloadButtonVisible: () => Template.instance().downloadButtonVisible.get(),
  samplingStepVisible: () => Template.instance().samplingStepVisible.get(),
  samplingStep: () => Template.instance().samplingStep.get(),
});

Template.Exports.events({
  'change .export-type': (event, templateInstance) => {
    const exportType = event.target.value;
    templateInstance.exportType.set(event.target.value);

    if (
      exportType === 'allParticipantsSingle'
      || exportType === 'allParticipantsIndividual'
      || exportType === 'allGlancesSingle'
      || exportType === 'allGlancesIndividual'
    ) {
      templateInstance.analysisSelectorVisible.set(true);
    } else {
      templateInstance.analysisSelectorVisible.set(false);
    }
  },
  'change .analysis-selector, change .export-type': (
    event,
    templateInstance,
  ) => {
    const analysisId = $('.analysis-selector')
      ? $('.analysis-selector').val()
      : undefined;

    templateInstance.analysisId.set(analysisId);

    if (
      templateInstance.exportType.get() === 'allGlancesSingle'
      || templateInstance.exportType.get() === 'allGlancesIndividual'
    ) {
      templateInstance.samplingStepVisible.set(true);
    } else {
      templateInstance.samplingStepVisible.set(false);
    }

    if (templateInstance.analysisId.get()) {
      templateInstance.downloadButtonVisible.set(true);
    } else {
      templateInstance.downloadButtonVisible.set(false);
    }
  },
  'change .sampling-rate': (event, templateInstance) => {
    templateInstance.samplingStep.set(event.target.value);
  },
  'click .download-button': (event, templateInstance) => {
    console.log(templateInstance.exportType.get());

    if (templateInstance.analysisId.get()) {
      const analysis = Analyses.findOne({
        _id: templateInstance.analysisId.get(),
      });

      if (templateInstance.exportType.get() === 'allParticipantsSingle') {
        console.log('analysis.saveCSVParticipants()');
        analysis.saveCSVParticipants();
        // } else if (
        //   templateInstance.exportType.get() === 'allParticipantsIndividual'
        // ) {
        //   console.log('analysis.saveCSVParticipants({ individual: true })');
        //   analysis.saveCSVParticipants({
        //     individual: true,
        //   });
      } else if (templateInstance.exportType.get() === 'allGlancesSingle') {
        console.log('analysis.saveCSVParticipants()');
        analysis.saveCSVGlances();
      } else if (
        templateInstance.exportType.get() === 'allGlancesIndividual'
      ) {
        console.log('analysis.saveCSVParticipants({ individua: true })');
      }
    }
  },
});
