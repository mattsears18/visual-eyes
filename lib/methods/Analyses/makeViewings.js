import Jobs from '../../../collections/Jobs/Jobs';
import makeViewingsByParticipantStimulus from './makeViewingsByParticipantStimulus';

Meteor.methods({
  'analyses.makeViewings'({ jobId, callback }) {
    check(jobId, String);
    // console.log('analyses.makeViewings');
    // console.log('jobId: ' + jobId);

    job = Jobs.getJob(jobId);

    analysis = Analyses.findOne(job.data.analysisId);
    stimulus = Stimuli.findOne(job.data.stimulusId);
    participant = Participants.findOne(job.data.participantId);

    if(analysis) {
      if(stimulus) {
        if(participant){
          // console.log('================================================================================')
          // console.log('participant: ' + participant.name);
          // console.log('================================================================================')
          // console.log('stimulus: ' + stimulus.name);

          indices = '';
          indices = makeViewingsByParticipantStimulus(analysis, stimulus, participant);

          // if(indices && indices.length) {
          //   indices.forEach(function(ind) {
          //     // console.log('start: ' + ind.start + ' end: ' + ind.end);
          //   });
          // } else {
          //   // console.log('no viewing indices created');
          // }
          // // console.log('job finished');

          job.done();
          callback();

        } else {
          // console.log('participant not found: ' + job.data.participantId);

          Analyses.update(
            { _id: job.data.analysisId },
            { $pull: { participantIds: job.data.participantId }},
            { multi: true },
            (err, num) => {
              if(err) {
                console.log(err);
              }
            }
          );
          job.done();
          callback();
        }
      } else {
        // console.log('stimulus not found: ' + job.data.stimulusId);

        Analyses.update(
          { _id: job.data.analysisId },
          { $pull: { stimulusIds: job.data.stimulusId }},
          { multi: true },
          (err, num) => {
            if(err) {
              console.log(err);
            }
          }
        );
        job.done();
        callback();
      }
    } else {
      // console.log('analysis not found: ' + job.data.analysisId);
      job.done();
      callback();
    }
  },
});
