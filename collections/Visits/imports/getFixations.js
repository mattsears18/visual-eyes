import Eyeevents from '../../Eyeevents/Eyeevents';

export default function getFixations() {
  return Eyeevents.find(
    {
      studyId: this.studyId,
      type: 'Fixation',
      $and: [
        { timestamp: { $gte: this.timestamp } },
        { timestampEnd: { $lte: this.timestampEnd } },
      ],
    },
    { sort: { timestamp: 1 } },
  );
}
