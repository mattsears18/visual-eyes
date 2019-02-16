import Stimuli from './Stimuli';

Stimuli.after.remove(function(userId, stimulus) {
  if(Meteor.isServer) {
    Aois.update({ stimulusId: stimulus._id }, { $unset: { stimulusId: "" }});
    Stimulusfiles.remove({ _id: stimulus.stimulusfileId });
  }
});
