import Stimuli from './Stimuli';

Stimuli.after.remove(function(userId, stimulus) {
  if(Meteor.isServer) {
    Aois.remove({ stimulusId: stimulus._id });
    Stimulusfiles.remove({ _id: stimulus.stimulusfileId });
    Recordings.remove({ stimulusId: stimulus._id });

    Analyses.update({ studyId: stimulus.studyId }, { $pull: { stimulusIds: stimulus._id }}, { multi: true }, (err, num) => {
      if(err) {
        console.log(err);
      }
    });
  }
});
