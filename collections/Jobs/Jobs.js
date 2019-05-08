var Jobs = JobCollection("JobsQueue");

if (Meteor.isServer) {
  Jobs.allow({
    // Grant full permission to any authenticated user
    admin: function(userId, method, params) {
      return !!userId;
    }
  });
}

export default Jobs;
