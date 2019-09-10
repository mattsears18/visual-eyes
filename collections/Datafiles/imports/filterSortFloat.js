import helpers from '../../../lib/helpers';

export default function filterSortFloat(field, data) {
  if (Meteor.isServer && !Meteor.isTest) console.log('Datafiles.filterSortFloat()');

  let rows = [...data];

  rows = rows.filter(row => helpers.isFloaty(row[field]));
  return rows.sort((a, b) => parseFloat(a[field]) - parseFloat(b[field]));
}
