import Tabular from 'meteor/aldeed:tabular';
import Gazepoints from '../Gazepoints';
import Studies from '../../Studies/Studies';

new Tabular.Table({
  name: 'GazepointsByVisit',
  collection: Gazepoints,
  extraFields: ['_id'],
  columns: [
    { data: 'index', title: 'Index' },
    { data: 'timestamp', title: 'Timestamp' },
    { data: 'category', title: 'Category' },
    { data: 'x', title: 'X' },
    { data: 'y', title: 'Y' },
  ],
});
