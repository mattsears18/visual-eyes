import Jobs from '../../../collections/Jobs/Jobs';

queueDatafilesProcess = Jobs.processJobs('datafiles.process',
  function (jobDoc, callback) {
    console.log('');
    console.log('got a job!');
    console.log('datafiles.process');
    console.log('datafileId: ' + jobDoc.data.datafileId);

    Meteor.call('datafiles.process', {
      datafileId: jobDoc.data.datafileId,
      callback: callback,
    });
  }
);

export default queueDatafilesProcess;
