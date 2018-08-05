import Viewings from './Viewings';

Viewings.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
  doc.userPermissions = {
    'update':   [userId],
    'destroy':  [userId],
  }

  doc.minRecordingTime = Meteor.call('viewings.getMinTime', { viewing: doc });
  doc.maxRecordingTime = Meteor.call('viewings.getMaxTime', { viewing: doc });
  doc.duration = doc.maxRecordingTime - doc.minRecordingTime;
});
