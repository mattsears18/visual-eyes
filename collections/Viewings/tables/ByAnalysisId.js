import Viewings from '../Viewings';
import Tabular from 'meteor/aldeed:tabular';
import Studies from '../../Studies/Studies';

new Tabular.Table({
  name: 'ViewingsByAnalysisId',
  collection: Viewings,
  extraFields: [
    '_id',
    'studyId',
    'datafileId',
    // 'datafile',
    'aoiId',
    // 'aoi',
    'studyId',
    'analysisId',
  ],
  columns: [
    {
      data: {
        _: 'datafileName()',
      },
      title: 'Data File',
      render: function(data, type, row, meta) {
        if(data) {
          return `<a href="${row.datafile().link()}?download=true" target="_top">${data}</a>`;
        }
      }
    },
    {
      data: {
        _: 'aoiName()',
      },
      title: 'AOI Name',
      render: function(data, type, row, meta) {
        if(data) {
          return `<a href="/studies/${row.studyId()}/analyses/${row.analysisId}/aois/${row.aoiId}">${data}</a>`;
        }
      }
    },
    {
      data: 'number',
      title: 'Viewing Number',
      render: function(data, type, row, meta) {
        if(data) {
          return `<a href="/studies/${row.studyId()}/viewings/${row._id}">${data}</a>`;
        }
      },
    },
    {
      data: 'duration',
      title: 'Duration',
      render: function(data, type, row, meta) {
        if(data) {
          return `<a href="/studies/${row.studyId()}/viewings/${row._id}">${helpers.millisecondsToHMSMS(data)}</a>`;
        }
      },
    },
  ],
  // order: [[ 0, 'asc' ], [ 1, 'asc' ], [ 2, 'asc' ]]
});
