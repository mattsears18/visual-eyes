import Jobs from '../../collections/Jobs/Jobs';

queue = Jobs.processJobs(
  'datafiles.process',

  function (job, callback) {
    Meteor.call('datafiles.process', {
      datafileId: job.data.datafileId,
    });

    // Only called when there is a valid job
    job.fail();
    callback();
  }
);
