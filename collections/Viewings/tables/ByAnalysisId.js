import Viewings from '../Viewings';
import Tabular from 'meteor/aldeed:tabular';
import Studies from '../../Studies/Studies';

new Tabular.Table({
  name: 'ViewingsByAnalysisId',
  collection: Viewings,
  pageLength: 100,
  extraFields: [
    '_id',
    'studyId',
    'participantId',
    'stimulus',
    'aois',
    'aoiIds',
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
      data: 'aois()',
      title: 'Areas of Interest',
      render: function(data, type, row, meta) {
        if(data) {
          resp = '';
          data.fetch().forEach(function(aoi) {
            resp += `<div><a href="/studies/${row.studyId}/aois/${aoi._id}">${aoi.name}</div>`
          });
          return resp;
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
      data: 'averageSlideHullArea',
      title: 'Average Convex Hull Area (Slide Method)',
      render: function(data, type, row, meta) {
        if(data) {
          return `<a href="/studies/${row.studyId}/viewings/${row._id}">${helpers.formatNumber(data)}</a>`;
        }
      },
    },
    {
      data: {
        _: 'averageSlideHullCoverage()',
      },
      title: 'Average Convex Hull Coverage (Slide Method)',
      render: function(data, type, row, meta) {
        if(data) {
          return `<a href="/studies/${row.studyId}/viewings/${row._id}">${helpers.formatNumber(data * 100)}%</a>`;
        }
      },
    },
  ],
  order: [[ 0, 'asc' ], [ 1, 'asc' ], [ 2, 'asc' ]]
});
