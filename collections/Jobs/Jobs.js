const Jobs = JobCollection('JobsQueue');

if (Meteor.isServer) {
  Jobs.allow({
    // Grant full permission to any authenticated user
    admin(userId, method, params) {
      return !!userId;
    },
  });
}

export default Jobs;
