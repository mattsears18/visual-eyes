import Recordings from '../Recordings';
import Tabular from 'meteor/aldeed:tabular';
import Studies from '../../Studies/Studies';

new Tabular.Table({
  name: 'RecordingsByViewing',
  collection: Recordings,
  extraFields: [
    '_id',
  ],
  columns: [
    {data: 'index', title: 'Index'},
    {data: 'recordingTime', title: 'Recording Time'},
    {data: 'timeOfDay', title: 'Time of Day'},
    {data: 'category', title: 'Category'},
    {data: 'x', title: 'X'},
    {data: 'y', title: 'Y'},
  ],
});
