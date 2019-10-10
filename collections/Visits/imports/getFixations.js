import Eyeevents from '../../Eyeevents/Eyeevents';

export default function getFixations() {
  return Eyeevents.find(
    {
      participantId: this.participantId,
      type: 'Fixation',
      index: { $in: this.fixationIndices },
    },
    { sort: { index: 1 } },
  );
}
