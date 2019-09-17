import Eyeevents from '../../../collections/Eyeevents/Eyeevents';
import Participants from '../../../collections/Participants/Participants';

Template.Eyeevents.onCreated(function() {
  const studyId = FlowRouter.getParam('studyId');

  const self = this;

  self.autorun(function() {
    self.subscribe('stimuli.byStudyIdWithBlank', studyId);
    self.subscribe('aois.byStudyIdWithBlank', studyId);
  });
});

Template.Eyeevents.helpers({
  participant: () => Participants.findOne(),
  selector: () => ({ participantId: FlowRouter.getParam('participantId') }),
});
