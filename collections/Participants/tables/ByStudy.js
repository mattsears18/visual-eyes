import Participants from '../Participants';
import Tabular from 'meteor/aldeed:tabular';
import Studies from '../../Studies/Studies';

new Tabular.Table({
  name: 'ParticipantsByStudy',
  collection: Participants,
  extraFields: [
    '_id',
  ],
  columns: [
    {data: 'name', title: 'Name'},
  ],
});
