import Jobs from '../../../collections/Jobs/Jobs';
import makeViewingsByParticipantStimulus from './makeViewingsByParticipantStimulus';

Meteor.methods({
  'analyses.makeViewings'({ jobId, callback }) {
    check(jobId, String);
    // console.log('analyses.makeViewings');
    // console.log('jobId: ' + jobId);

    job = Jobs.getJob(jobId);

    analysis = Analyses.findOne(job.data.analysisId);

    participant = Participants.findOne(job.data.participantId);
    stimulus = Stimuli.findOne(job.data.stimulusId);

    if(stimulus) {
      // console.log('================================================================================')
      // console.log('participant: ' + participant.name);
      // console.log('================================================================================')
      // console.log('stimulus: ' + stimulus.name);

      indices = '';
      indices = makeViewingsByParticipantStimulus(analysis, participant, stimulus);

      if(indices && indices.length) {
        indices.forEach(function(ind) {
          // console.log('start: ' + ind.start + ' end: ' + ind.end);
        });
      } else {
        // console.log('no viewing indices created');
      }
      // console.log('job finished');

      job.done();
      callback();
    } else {
      // console.log('stimulus not found: ' + job.data.stimulusId);
      job.fail('stimulus not found: ' + job.data.stimulusId);
      callback();
    }
  },
});
