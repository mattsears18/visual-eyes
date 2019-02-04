import Jobs from '../collections/Jobs/Jobs';
import jst from 'jStat'; // can't write import jStat from 'jStat' as it would override the jStat variable on the client and set it to undefined

if (Meteor.isServer){
  jStat = jst.jStat;
  fs = Npm.require('fs');
}

Meteor.startup(() => {
  Jobs.startJobServer();
  // Start the myJobs queue running
  // force fail any jobs with "running" status
  runningJobs = Jobs.find({ status: 'running' });

  runningJobs.forEach(function(jobDoc) {
    job = Jobs.getJob(jobDoc._id);
    job.fail('server restarted');
  });
});
