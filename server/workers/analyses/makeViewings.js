import Jobs from '../../../collections/Jobs/Jobs';

export default queueAnalysesMakeViewings = Jobs.processJobs('analyses.makeViewings',
  {
    concurrency: 1,
  },
  (job, callback) => {
    // console.log('');
    // console.log('got a job!');
    // console.log('analyses.makeViewings');
    // console.log('analysisId: ' + jobDoc.data.analysisId + ', participantId: ' + jobDoc.data.participantId + ', stimulusId: ' + jobDoc.data.stimulusId);

    Meteor.call('analyses.makeViewings', {
      analysisId:     job.data.analysisId,
      participantId:  job.data.participantId,
      stimulusId:     job.data.stimulusId,
    }, (err, results) => {
      if(err) {
        console.log(err);
        if(err.error === 'noParticipant') {
          Analyses.update(
            { _id: err.details.analysisId },
            { $pull: { participantIds: err.details.participantId }},
            { multi: true }
          );
        } else if(err.error === 'noStimulus') {
          Analyses.update(
            { _id: err.details.analysisId },
            { $pull: { stimulusIds: err.details.stimulusId }},
            { multi: true }
          );
        }
        job.cancel();
        job.remove();
      } else {
        job.done();
      }
      callback();
    });
  }
);
