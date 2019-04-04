import Jobs from '../../../collections/Jobs/Jobs';
import makeViewingsByParticipantStimulus from './makeViewingsByParticipantStimulus';

Meteor.methods({
  'analyses.makeViewings'({ analysisId, participantId, stimulusId }) {
    check(analysisId, String);
    check(participantId, String);
    check(stimulusId, String);

    // console.log('analyses.makeViewings');

    let analysis = Analyses.findOne(analysisId);
    if(!analysis) {
      throw new Meteor.Error("noAnalysis", "no analysis found for analysisId: " + analysisId, arguments[0]);
    }

    let stimulus = Stimuli.findOne(stimulusId);
    if(!stimulus) {
      throw new Meteor.Error("noStimulus", "no stimulus found for stimulusId: " + stimulusId, arguments[0]);
    }

    let participant = Participants.findOne(participantId);
    if(!participant) {
      throw new Meteor.Error("noparticipant", "no participant found for participantId: " + participantId, arguments[0]);
    }

    // console.log('make viewings for analysisId: ' + analysis._id + ' stimulusId: ' + stimulus._id + ' participantId: ' + participant._id);
    let indices = makeViewingsByParticipantStimulus(analysis, stimulus, participant);
    return indices;
  },
});
