import Aois from './Aois';

Aois.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
});

Aois.after.remove(function(userId, aoi) {
  if(Meteor.isServer) {
    Recordings.remove({ aoiId: aoi._id });
    Viewings.remove({ aoiId: aoi._id });
    //TODO update datafile recording count
  }
});
