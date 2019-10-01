import Eyeevents from '../../Eyeevents/Eyeevents';

export default function getFixations() {
  return Eyeevents.find(
    {
      participantId: this.participantId,
      type: 'Fixation',
      combinedEventIndex: { $in: this.fixationIndices },
    },
    { sort: { combinedEventIndex: 1 } },
  );
}
