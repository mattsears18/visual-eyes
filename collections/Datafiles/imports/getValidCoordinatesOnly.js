import helpers from '../../../lib/helpers';

export default function getValidCoordinatesOnly(data) {
  if (Meteor.isServer && !Meteor.isTest) console.log('Datafiles.getValidCoordinatesOnly()');
  return data.filter(row => parseFloat(row.x) >= 0 && parseFloat(row.y) >= 0);
}
