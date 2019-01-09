import Viewings from './Viewings';
import Jobs from '../Jobs/Jobs';

Viewings.before.insert(function (userId, doc) {
  doc.createdAt = new Date;

  doc.minRecordingTime = Meteor.call('viewings.getMinTime', { viewing: doc });
  doc.maxRecordingTime = Meteor.call('viewings.getMaxTime', { viewing: doc });
  doc.duration = doc.maxRecordingTime - doc.minRecordingTime;
});

Viewings.after.remove(function(userId, viewing) {
  if(Meteor.isServer) {
    Jobs.remove({
      'data.viewingId': viewing._id,
    });
  }
});
