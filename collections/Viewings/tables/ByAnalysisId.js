import Viewings from '../Viewings';
import Tabular from 'meteor/aldeed:tabular';
import Studies from '../../Studies/Studies';

new Tabular.Table({
  name: 'ViewingsByAnalysisId',
  collection: Viewings,
  extraFields: [
    '_id',
    'studyId',
    'participantId',
    'aoiId',
    'stimulus',
    'stimulusId',
    'stimulusName',
    'analysisId',
  ],
  columns: [
    {
      data: {
        _: 'participantName()',
      },
      title: 'Participant',
      render: function(data, type, row, meta) {
        if(data) {
          return `<a href="/studies/${row.studyId}/participants/${row.participantId}">${data}</a>`;
        }
      }
    },
    {
      data: {
        _: 'stimulusName()',
      },
      title: 'Stimulus',
      render: function(data, type, row, meta) {
        if(data) {
          return `<a href="/studies/${row.studyId}/stimuli/${row.stimulusId}">${data}</a>`;
        }
      }
    },
    {
      data: 'number',
      title: 'Viewing Number',
      render: function(data, type, row, meta) {
        if(data) {
          return `<a href="/studies/${row.studyId}/viewings/${row._id}">${data}</a>`;
        }
      },
    },
    {
      data: 'duration',
      title: 'Duration',
      render: function(data, type, row, meta) {
        if(data) {
          return `<a href="/studies/${row.studyId}/viewings/${row._id}">${helpers.millisecondsToHMSMS(data)}</a>`;
        }
      },
    },
    {
      data: 'averageSlideHullSize',
      title: 'Average Convex Hull Size (Slide)',
      render: function(data, type, row, meta) {
        if(data) {
          return `<a href="/studies/${row.studyId}/viewings/${row._id}">${helpers.formatNumber(data)}</a>`;
        }
      },
    },
  ],
  // order: [[ 0, 'asc' ], [ 1, 'asc' ], [ 2, 'asc' ]]
});
