import Aois from './Aois';

Aois.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
  doc.userPermissions = {
    'update':   [userId],
    'destroy':  [userId],
  }
});

Aois.after.remove(function(userId, aoi) {
  // console.log('remove');
  // console.log(aoi._id);
  Recordings.remove({ aoiId: aoi._id });
  Viewings.remove({ aoiId: aoi._id });
  //TODO update datafile recording count
});
