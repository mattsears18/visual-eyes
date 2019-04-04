import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'analyses.makeViewingJobs'({ analysisId }) {
    check(analysisId, String);
    if(Meteor.isServer){
      console.log('analyses.makeViewingJobs');
      console.log('analysisId: ' + analysisId);

      let analysis = Analyses.findOne({ _id: analysisId });

      Viewings.remove({ analysisId: analysis._id });
      Jobs.remove({ type: 'analyses.makeViewings', 'data.analysisId': analysis._id });
      Analyses.update({ _id: analysisId }, { $set: { status: "processing" }});
      analysis.participantIds.forEach((participantId) => {
        let participant = Participants.findOne({ _id: participantId });
        if(!participant) {
          console.log('no participant found: ' + participantId);
          Analyses.update({ _id: analysisId }, { $pull: { participantIds: participantId }}, { multi: true });
          return;
        }

        analysis.stimulusIds.forEach((stimulusId) => {
          let stimulus = Stimuli.findOne({ _id: stimulusId });
          if(!stimulus) {
            console.log('no stimulus found: ' + stimulusId);
            Analyses.update({ _id: analysisId }, { $pull: { stimulusIds: stimulusId }}, { multi: true });
            // console.log('analysisId: ' + analysis._id);
            // console.log('participantId: ' + participantId);
            // console.log('stimulusId: ' + stimulusId);
            return;
          }

          // console.log('make job for analysisId: ' + analysis._id + ', participantId: ' + participantId + ', stimulusId: ' + stimulusId);
          let job = new Job(Jobs, 'analyses.makeViewings', {
            analysisId: analysisId,
            participantId: participantId,
            stimulusId: stimulusId,
          });

          job.priority('normal')
            .retry({
              retries: Jobs.forever,
              wait: 1000,
              backoff: 'constant'     // wait constant amount of time between each retry
            })
            .save();
        });
      });
    }
  },
});
