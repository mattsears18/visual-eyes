import Stimuli from './Stimuli';

Stimuli.after.remove(function(userId, stimulus) {
  if(Meteor.isServer) {
    Aois.remove({ stimulusId: stimulus._id });
    Stimulusfiles.remove({ _id: stimulus.stimulusfileId });
    Gazepoints.remove({ stimulusId: stimulus._id });

    Analyses.update({ studyId: stimulus.studyId }, { $pull: { stimulusIds: stimulus._id }}, { multi: true }, (err, num) => {
      if(err) {
        console.log(err);
      }
    });
  }
});

Stimuli.after.update(function(userId, stimulus, fieldNames, modifier, options) {
  if(
    this.previous.width   != stimulus.width ||
    this.previous.height  != stimulus.height
  ) {
    Meteor.call('studies.reprocessAnalyses', { studyId: stimulus.studyId });
  }
});
