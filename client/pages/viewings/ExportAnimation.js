/* eslint-disable meteor/template-names */
Template.ExportAnimation.onCreated(function() {
  this.exportType = ReactiveVar();
  this.samplingStep = new ReactiveVar(0);
  this.downloadButtonVisible = new ReactiveVar(false);
  this.metricsButtonVisible = new ReactiveVar(false);
  this.samplingStepVisible = new ReactiveVar(false);
});

Template.ExportAnimation.helpers({
  samplingStep: () => Template.instance().samplingStep.get(),
  downloadButtonVisible: () => Template.instance().downloadButtonVisible.get(),
  metricsButtonVisible: () => Template.instance().metricsButtonVisible.get(),
  samplingStepVisible: () => Template.instance().samplingStepVisible.get(),
});

Template.ExportAnimation.events({
  'change .export-type': (event, templateInstance) => {
    templateInstance.downloadButtonVisible.set(!!event.target.value);
    templateInstance.exportType.set(event.target.value);

    if (
      ['detailsCurrent', 'detailsAllSingle', 'detailsAllIndividual'].includes(
        templateInstance.exportType.get(),
      )
    ) {
      templateInstance.samplingStepVisible.set(true);
    } else {
      templateInstance.samplingStepVisible.set(false);
    }
  },
  'change .sampling-rate': (event, templateInstance) => {
    templateInstance.samplingStep.set(event.target.value);
  },
  'click .download-button': (event, templateInstance) => {
    if (templateInstance.exportType.get() === 'detailsCurrent') {
      Template.currentData().viewing.saveCSV({
        ...Template.currentData().hullParams,
        samplingStep: templateInstance.samplingStep.get(),
      });
    } else if (templateInstance.exportType.get() === 'detailsAllSingle') {
      // console.log(
      //   `analysis.saveCSVViewings({samplingStep: ${templateInstance.samplingStep.get()}})`,
      // );
    } else if (templateInstance.exportType.get() === 'detailsAllIndividual') {
      // console.log(
      //   `analysis.saveCSVViewings({samplingStep: ${templateInstance.samplingStep.get()}, individual: true})`,
      // );
    } else if (templateInstance.exportType.get() === 'summaryStats') {
      console.log('summaryStats');
    }
  },
});
