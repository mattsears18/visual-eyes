import helpers from '../../../lib/helpers';
import Stimuli from '../../Stimuli/Stimuli';

export default function assignStimuli(sortedRows) {
  if (Meteor.isServer && !Meteor.isTest) console.log('Datafile.assignStimuli()');

  const rows = [...sortedRows];

  const blankStimulusId = helpers.findOrInsert('stimuli', {
    name: '-',
    studyId: this.studyId,
  });
  const blankStimulus = Stimuli.findOne({ _id: blankStimulusId });

  if (this.fileFormat === 'smi') {
    for (let i = 0; i < rows.length; i += 1) {
      // set stimulusName to '-' for any rows with an aoiName === '-'
      if (
        (!rows[i].aoiName
          || rows[i].aoiName === ''
          || rows[i].aoiName === '-')
        && rows[i].stimulusName !== '-'
      ) {
        rows[i].stimulusName = '-';
      }
    }
  }

  let stimuli = Stimuli.find({ studyId: this.studyId }).fetch();

  for (let i = 0; i < rows.length; i += 1) {
    let stimulus;

    // Only assign stimuli rows with floaty >= 0 x and y coordinates

    if (
      helpers.isFloaty(rows[i].x)
      && helpers.isFloaty(rows[i].y)
      && rows[i].x >= 0
      && rows[i].y >= 0
    ) {
      stimulus = stimuli.find(row => row.name === rows[i].stimulusName);
    } else {
      stimulus = blankStimulus;
    }

    if (!stimulus) {
      const stimulusId = helpers.findOrInsert('stimuli', {
        name: rows[i].stimulusName,
        studyId: this.studyId,
      });

      stimulus = { name: rows[i].stimulusName, _id: stimulusId };
      stimuli.push(stimulus);
    }
    rows[i].stimulusId = stimulus._id;

    if (!stimulus.datafileIds || !stimulus.datafileIds.includes(this._id)) {
      Stimuli.update(
        { _id: stimulus._id },
        { $addToSet: { datafileIds: this._id } },
      );

      stimuli = Stimuli.find({ studyId: this.studyId }).fetch();
    }
  }

  const finalBlankStimulus = Stimuli.findOne({ _id: blankStimulusId });
  if (
    !finalBlankStimulus.datafileIds
    || !finalBlankStimulus.datafileIds.length
  ) {
    Stimuli.remove({ _id: blankStimulusId });
  }

  return rows;
}
