import Jobs from '../../../collections/Jobs/Jobs';
import makeViewingsByParticipantAoi from './makeViewingsByParticipantAoi';

Meteor.methods({
  'analyses.makeViewings'({ jobId, callback }) {
    check(jobId, String);
    // console.log('analyses.makeViewings');
    // console.log('jobId: ' + jobId);

    job = Jobs.getJob(jobId);

    analysis = Analyses.findOne(job.data.analysisId);
    participant = Participants.findOne(job.data.participantId);
    aoi = Aois.findOne(job.data.aoiId);

    if(aoi) {
      // console.log('================================================================================')
      // console.log('participant: ' + participant.name);
      // console.log('================================================================================')
      // console.log('aoi: ' + aoi.name);

      indices = '';
      indices = makeViewingsByParticipantAoi(analysis, participant, aoi);

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
      // console.log('aoi not found: ' + job.data.aoiId);
      job.fail('aoi not found: ' + job.data.aoiId);
      callback();
    }
  },
});
