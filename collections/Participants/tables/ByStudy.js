import Tabular from 'meteor/aldeed:tabular';
import Participants from '../Participants';
import Studies from '../../Studies/Studies';

new Tabular.Table({
  name: 'ParticipantsByStudy',
  collection: Participants,
  extraFields: [
    '_id',
  ],
  columns: [
    { data: 'name', title: 'Name' },
  ],
});
