import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'analyses.makeParticipantJobs'({ analysisId }) {
    if(Meteor.isServer){

      // console.log('analyses.makeParticipantJobs');
      // console.log('analysisId: ' + analysisId);

      Viewings.remove({ analysisId: analysisId }, function() {
        Jobs.remove({ type: 'analyses.makeViewings', 'data.analysisId': analysisId }, function() {
          analysis = Analyses.findOne(analysisId);
          if(!analysis){
            // console.log('no analysis: ' + analysisId);
          } else {
            Analyses.update({ _id: analysis._id }, { $set: { status: "processing" }});

            analysis.participantIds.forEach(function(participantId) {
              participant = Participants.findOne({ _id: participantId });
              if(participant) {
                analysis.stimulusIds.forEach(function(stimulusId) {
                  stimulus = Stimuli.findOne({ _id: stimulusId });
                  if(stimulus) {
                    // console.log('make job for analysisId: ' + analysis._id + ', participantId: ' + participantId + ', stimulusId: ' + stimulusId);

                    var job = new Job(Jobs, 'analyses.makeViewings', {
                      analysisId: analysis._id,
                      participantId: participantId,
                      stimulusId: stimulusId,
                    });

                    job.priority('normal')
                      .retry({
                        retries: Jobs.forever,   // Retry 5 times,
                        wait: 5*1000,  // waiting 5 seconds between attempts
                        backoff: 'constant'  // wait constant amount of time between each retry
                      })
                      .save();
                  } else {
                    // console.log('no stimulus found: ' + stimulusId);
                    Analyses.update({ _id: analysis._id }, { $pull: { stimulusIds: stimulusId }}, { multi: true });
                    // console.log('analysisId: ' + analysis._id);
                    // console.log('participantId: ' + participantId);
                    // console.log('stimulusId: ' + stimulusId);
                  }
                });
              } else {
                // console.log('no participant found: ' + participantId);
                Analyses.update({ _id: analysis._id }, { $pull: { participantIds: participantId }}, { multi: true });
                // console.log('analysisId: ' + analysis._id);
                // console.log('participantId: ' + participantId);
              }
            });
          }
        });
      });
    }
  },
});
