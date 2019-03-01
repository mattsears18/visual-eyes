import Aois from './Aois';

Aois.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
});

Aois.after.remove(function(userId, aoi) {
  if(Meteor.isServer) {
    Recordings.remove({ aoiId: aoi._id });
  }
});
