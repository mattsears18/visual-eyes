/* eslint-disable meteor/template-names */
require('./ExportAnimation.html');

const { FlowRouter } = require('meteor/kadira:flow-router');

Template.ExportAnimation.onCreated(function() {
  this.exportType = ReactiveVar();
  this.samplingStep = new ReactiveVar(0);
  this.downloadButtonVisible = new ReactiveVar(false);
  this.downloadButtonDisabled = new ReactiveVar(false);
  this.metricsButtonVisible = new ReactiveVar(false);
  this.samplingStepVisible = new ReactiveVar(false);

  this.autorun(() => {
    const studyId = FlowRouter.getParam('studyId');
    this.subscribe('variables.byStudyId', studyId);
  });
});

Template.ExportAnimation.helpers({
  samplingStep: () => Template.instance().samplingStep.get(),
  downloadButtonVisible: () => Template.instance().downloadButtonVisible.get(),
  downloadButtonDisabled: () => Template.instance().downloadButtonDisabled.get(),
  metricsButtonVisible: () => Template.instance().metricsButtonVisible.get(),
  samplingStepVisible: () => Template.instance().samplingStepVisible.get(),
});

Template.ExportAnimation.events({
  'change .export-type': (event, templateInstance) => {
    templateInstance.downloadButtonVisible.set(!!event.target.value);
    templateInstance.exportType.set(event.target.value);

    if (
      ['visitsCurrent', 'visitsAllSingle', 'visitsIndividualZip'].includes(
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
    templateInstance.downloadButtonDisabled.set(true);

    const { visit } = Template.currentData();
    const { hullParams } = Template.currentData();
    const samplingStep = templateInstance.samplingStep.get();

    if (templateInstance.exportType.get() === 'visitsCurrent') {
      Template.currentData().visit.saveCSV({
        ...Template.currentData().hullParams,
        samplingStep: templateInstance.samplingStep.get(),
      });

      templateInstance.downloadButtonDisabled.set(false);
    } else if (templateInstance.exportType.get() === 'visitsAllSingle') {
      // console.log(
      //   `analysis.saveCSVVisits({samplingStep: ${templateInstance.samplingStep.get()}})`,
      // );
    } else if (templateInstance.exportType.get() === 'visitsIndividualZip') {
      templateInstance.subscribe(
        'visits.byAnalysisIdWithGazepoints',
        FlowRouter.getParam('analysisId'),
        () => {
          visit.analysis().saveCSV({
            ...hullParams,
            samplingStep,
            groupBy: 'visit',
            type: 'individualZip',
          });

          templateInstance.downloadButtonDisabled.set(false);
        },
      );
    } else if (templateInstance.exportType.get() === 'visitsSummary') {
      templateInstance.subscribe(
        'datafiles.byStudyId',
        FlowRouter.getParam('studyId'),
        () => {
          templateInstance.subscribe(
            'visits.byAnalysisIdWithGazepoints',
            FlowRouter.getParam('analysisId'),
            () => {
              visit.analysis().saveCSV({
                ...hullParams,
                samplingStep,
                groupBy: 'visit',
                type: 'summary',
              });

              templateInstance.downloadButtonDisabled.set(false);
            },
          );
        },
      );
    } else if (templateInstance.exportType.get() === 'participantsSummary') {
      templateInstance.subscribe(
        'datafiles.byStudyId',
        FlowRouter.getParam('studyId'),
        () => {
          templateInstance.subscribe(
            'visits.byAnalysisIdWithGazepoints',
            FlowRouter.getParam('analysisId'),
            () => {
              visit.analysis().saveCSV({
                ...hullParams,
                samplingStep,
                groupBy: 'participant',
                type: 'summary',
              });

              templateInstance.downloadButtonDisabled.set(false);
            },
          );
        },
      );
    }
  },
});
