import Studies from './Studies';

Studies.before.insert(function (userId, doc) {
  doc.createdAt = new Date;
  doc.userPermissions = {
    'update':   [userId],
    'destroy':  [userId],
  }
});


Studies.after.insert(function (userId, doc) {
  if(Meteor.isServer) {
    Meteor.call('studies.doCalcs', {
      studyId: doc._id
    }, (err, res) => {
      if (err) {
        alert(err);
      } else {
        // success!
        console.log('success');
      }
    });  
  }
});
