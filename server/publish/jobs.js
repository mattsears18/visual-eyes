import Jobs from '../../collections/Jobs/Jobs';

Meteor.startup(function () {
  Meteor.publish('allJobs', function () {
    return Jobs.find({});
  });

  // Start the myJobs queue running
  return Jobs.startJobServer();
});
