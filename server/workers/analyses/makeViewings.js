import Jobs from '../../../collections/Jobs/Jobs';

export default queueAnalysesMakeViewings = Jobs.processJobs('analyses.makeViewings',
  {
    concurrency: 1,
  },
  function (jobDoc, callback) {
    // console.log('');
    // console.log('got a job!');
    // console.log('analyses.makeViewings');
    // console.log('analysisId: ' + jobDoc.data.analysisId + ', participantId: ' + jobDoc.data.participantId + ', stimulusId: ' + jobDoc.data.stimulusId);

    Meteor.call('analyses.makeViewings', {
      jobId: jobDoc._doc._id,
      callback: callback,
    });
  }
);
