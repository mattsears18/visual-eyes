/* eslint-disable meteor/template-names */
Template.ExportAnimation.onCreated(function() {
  this.exportType = ReactiveVar();
  this.samplingRate = new ReactiveVar(100);
  this.downloadButtonVisible = new ReactiveVar(false);
  this.samplingRateVisible = new ReactiveVar(false);
});

Template.ExportAnimation.helpers({
  samplingRate: () => Template.instance().samplingRate.get(),
  downloadButtonVisible: () => Template.instance().downloadButtonVisible.get(),
  samplingRateVisible: () => Template.instance().samplingRateVisible.get(),
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
      templateInstance.samplingRateVisible.set(true);
    } else {
      templateInstance.samplingRateVisible.set(false);
    }
  },
  'change .sampling-rate': (event, templateInstance) => {
    templateInstance.samplingRate.set(event.target.value);
  },
  'click .download-button': (event, templateInstance) => {
    if (templateInstance.exportType.get() === 'detailsCurrent') {
      Template.currentData().viewing.saveCSV({
        ...Template.currentData().hullParams,
        samplingRate: templateInstance.samplingRate.get(),
      });
    } else if (templateInstance.exportType.get() === 'detailsAllSingle') {
      // console.log(
      //   `analysis.saveCSVViewings({samplingRate: ${templateInstance.samplingRate.get()}})`,
      // );
    } else if (templateInstance.exportType.get() === 'detailsAllIndividual') {
      console.log(
        `analysis.saveCSVViewings({samplingRate: ${templateInstance.samplingRate.get()}, individual: true})`,
      );
    }
  },
});
