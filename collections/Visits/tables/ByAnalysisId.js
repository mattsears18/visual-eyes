import Tabular from 'meteor/aldeed:tabular';
import Visits from '../Visits';

const table = new Tabular.Table({
  name: 'VisitsByAnalysisId',
  collection: Visits,
  pageLength: 25,
  extraFields: [
    '_id',
    'studyId',
    'participantId',
    'stimulusId',
    'aois',
    'stimulusId',
    'analysisId',
  ],
  columns: [
    {
      data: {
        _: 'participantName()',
      },
      title: 'Participant',
      render(data, type, row, meta) {
        if (data) {
          return `<a href="/studies/${row.studyId}/participants/${row.participantId}">${data}</a>`;
        }
      },
    },
    {
      data: {
        _: 'stimulusName()',
      },
      title: 'Stimulus',
      render(data, type, row, meta) {
        if (data) {
          return `<a href="/studies/${row.studyId}/stimuli/${row.stimulusId}">${data}</a>`;
        }
      },
    },
    {
      data: 'number',
      title: 'Visit Number',
      render(data, type, row, meta) {
        if (data) {
          return `<a href="/studies/${row.studyId}/analyses/${row.analysisId}/${row.participantId}/${row.stimulusId}/${row.number}">${data}</a>`;
        }
      },
    },
    // {
    //   data: 'aois()',
    //   title: 'Areas of Interest',
    //   render(data, type, row, meta) {
    //     if (data) {
    //       resp = '';
    //       data.fetch().forEach(function(aoi) {
    //         resp += `<div><a href="/studies/${row.studyId}/aois/${aoi._id}">${aoi.name}</div>`;
    //       });
    //       return resp;
    //     }
    //   },
    // },
    {
      data: 'duration',
      title: 'Duration',
      render(data, type, row, meta) {
        if (data) {
          return `<a href="/studies/${row.studyId}/analyses/${row.analysisId}/${
            row.participantId
          }/${row.stimulusId}/${row.number}">${helpers.millisecondsToHMSMS(
            data,
          )}</a>`;
        }
      },
    },
    // {
    //   data: 'status',
    //   title: 'Status',
    //   render(status, type, row, meta) {
    //     if (status) {
    //       if (status === 'invalidStimulus') {
    //         return `<div><span class="label label-danger">Invalid Stimulus</span></div><div class="m-t-5"><span class="btn btn-primary upload-stimulusfile" data-stimulusid="${row.stimulusId}"><i class="fa fa-upload m-r-5"></i>Upload Reference Image</span></div>`;
    //       }
    //       if (status === 'processing') {
    //         return '<span class="label label-default">Processing<i class="fa fa-spinner fa-pulse fa-fw m-l-3"></i></span>';
    //       }
    //       if (status === 'processed') {
    //         return '<span class="label label-success">Processed</span>';
    //       }
    //       if (status === 'invalidStimulusDimensions') {
    //         return '<span class="label label-danger">Invalid Stimulus Dimensions</span>';
    //       }
    //     }
    //   },
    // },
  ],
  order: [[0, 'asc'], [1, 'asc'], [2, 'asc']],
});

export default table;
