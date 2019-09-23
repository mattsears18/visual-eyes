import Eyeevents from '../../Eyeevents/Eyeevents';

export default function getFixations() {
  return Eyeevents.find({
    studyId: this.studyId,
    type: 'Fixation',
    $and: [
      { timestamp: { $gte: this.timestamp } },
      { timestamp: { $lte: this.timestamp + this.duration } },
    ],
  });
}
