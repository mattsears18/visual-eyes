import Jobs from '../../../collections/Jobs/Jobs';

export default queueAnalysesMakeViewings = Jobs.processJobs('analyses.makeViewings',
  function (jobDoc, callback) {
    // console.log('');
    // console.log('got a job!');
    // console.log('analyses.makeViewings');
    // console.log('analysisId: ' + jobDoc.data.analysisId + ', datafileId: ' + jobDoc.data.datafileId + ', aoiId: ' + jobDoc.data.aoiId);

    Meteor.call('analyses.makeViewings', {
      jobId: jobDoc._doc._id,
      callback: callback,
    });
  }
);
