import Jobs from '../../../collections/Jobs/Jobs';

export default queueDatafilesProcess = Jobs.processJobs(
  'datafiles.process',
  { concurrency: 1 },
  async (job, callback) => {
    const datafile = Datafiles.collection.findOne({ _id: job.data.datafileId });

    if (!datafile) {
      console.log(`Datafile not found. datafileId: ${job.data.datafileId}`);
      job.cancel();
      job.remove();
    } else {
      try {
        const processed = await datafile.process();
        job.done();
      } catch (err) {
        if (
          ['noDatafile', 'unrecognizedFileFormat', 'noStudy'].indexOf(
            err.message,
          ) != -1
        ) {
          console.log(err.message);
          job.cancel();
          job.remove();
        } else {
          console.log(err);
        }
      }
    }

    const study = Studies.findOne({ _id: datafile.studyId });

    const totalJobCount = Jobs.find({
      type: 'datafiles.process',
      'data.datafileId': { $in: study.datafiles().map(d => d._id) },
    }).count();

    const completedJobCount = Jobs.find({
      type: 'datafiles.process',
      status: 'completed',
      'data.datafileId': { $in: study.datafiles().map(d => d._id) },
    }).count();

    console.log(`${completedJobCount} datafiles processed of ${totalJobCount}`);

    if (totalJobCount > 0 && completedJobCount === totalJobCount) {
      console.log('finished processing datafiles. reprocess analyses.');
      const stimuli = Stimuli.find({ studyId: this.studyId }).fetch();
      stimuli.forEach((stimulus) => {
        stimulus.setFixationsOnStimulus();
      });

      study.reprocessAnalyses();
    }

    callback();
  },
);
