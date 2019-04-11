var Jobs = JobCollection('JobsQueue');

if(Meteor.isServer) {
  Jobs.allow({
    // Grant full permission to any authenticated user
    admin: function (userId, method, params) {
      return (userId ? true : false);
    },
    // remove: function() {
    //   return true;
    // },
    // insert: function() {
    //   return true;
    // },
    // update: function() {
    //   return true;
    // },
  });
}

export default Jobs;
