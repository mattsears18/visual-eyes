import Recordings from '../Recordings';
import Tabular from 'meteor/aldeed:tabular';
import Studies from '../../Studies/Studies';

new Tabular.Table({
  name: 'RecordingsByStudy',
  collection: Recordings,
  extraFields: [
    '_id',
    'studyId',
    'datafileId',
    'datafile',
    'aoiId',
  ],
  columns: [
    {
      data: {
        _: 'datafileName()',
        // order: 'datafileName()',
      },
      // data: 'datafileName()',
      title: 'Data File',
      render: function(data, type, row, meta) {
        if(data) {
          return `<a href="${row.datafile().link()}?download=true" target="_top">${data}</a>`;
        }
      }
    },
    {
      data: 'aoiName',
      title: 'Area of Interest',
      render: function(data, type, row, meta) {
        if(data) {
          return `<a href='/studies/${row.studyId}/aois/${row.aoiId}'>${data}</a>`;
        }
      }
    },
    {data: 'index', title: 'Index'},
    {
      data: '_id',
      title: '_id',
      render: function(data, type, row, meta) {
        if(data) {
          return `<a href='/studies/${row.studyId}/recordings/${data}'>${data}</a>`;
        }
      }
    },
    {data: 'recordingTime', title: 'Recording Time'},
    {data: 'timeOfDay', title: 'Time of Day'},
    {data: 'category', title: 'Category'},
    {data: 'x', title: 'X'},
    {data: 'y', title: 'Y'},
  ],
  order: [[ 0, 'asc' ], [ 1, 'asc' ], [ 2, 'asc' ]]
});
