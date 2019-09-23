export default function setFixationsOnStimulus() {
  if (Meteor.isServer && !Meteor.isTest) console.log('Stimuli.setFixationsOnStimulus()');

  if (Meteor.isServer) {
    const blankStimulusId = helpers.findOrInsert('stimuli', {
      name: '-',
      studyId: this.studyId,
    });
    const blankAoiId = helpers.findOrInsert('aois', {
      name: '-',
      studyId: this.studyId,
      stimulusId: blankStimulusId,
    });

    Eyeevents.update(
      {
        stimulusId: this._id,
        type: 'Fixation',
        $and: [
          { xs: { $gte: 0 } },
          { ys: { $gte: 0 } },
          { xs: { $lte: this.width } },
          { ys: { $lte: this.height } },
        ],
      },
      { $set: { onStimulus: true } },
      { multi: true },
    );

    Eyeevents.update(
      {
        stimulusId: this._id,
        type: 'Fixation',
        $or: [
          { xs: { $lt: 0 } },
          { ys: { $lt: 0 } },
          { xs: { $gt: this.width } },
          { ys: { $gt: this.height } },
        ],
      },
      {
        $set: {
          onStimulus: false,
          stimulusId: blankStimulusId,
          aoiId: blankAoiId,
        },
      },
      { multi: true },
    );
  }
}
