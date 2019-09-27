import Eyeevents from '../../Eyeevents/Eyeevents';

export default function getFixations() {
  return Eyeevents.find(
    {
      studyId: this.studyId,
      type: 'Fixation',
      $and: [
        { combinedEventIndex: { $gte: this.combinedEventIndexStart } },
        { combinedEventIndex: { $lte: this.combinedEventIndexEnd } },
      ],
    },
    { sort: { timestamp: 1 } },
  );
}
