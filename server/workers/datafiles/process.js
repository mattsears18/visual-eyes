import Jobs from '../../../collections/Jobs/Jobs';

export default queueDatafilesProcess = Jobs.processJobs('datafiles.process',
  { concurrency: 1 },
  async (job, callback) => {
    let datafile = Datafiles.collection.findOne({ _id: job.data.datafileId });

    if(!datafile) {
      console.log('Datafile not found. datafileId: ' + job.data.datafileId);
      job.cancel();
      job.remove();
    } else {
      try {
        let processed = await datafile.process();
        job.done();
      } catch(err) {
        if(['noDatafile', 'unrecognizedFileFormat', 'noStudy'].indexOf(err.message) != -1) {
          console.log(err.message);
          job.cancel();
          job.remove();
        } else {
          console.log(err);
        }
      }
    }

    console.log('check if all datafiles processed. if so, reprocess analyses');
    callback();
  },
);
