import helpers from '../../../lib/helpers';

export default function assignStimuli(rawRows) {
  // console.log('assign stimuli');
  const rows = [...rawRows];

  let stimuli = Stimuli.find({ studyId: this.studyId }).fetch();

  for (let i = 0; i < rows.length; i += 1) {
    let stimulus = stimuli.find(row => row.name === rows[i].stimulusName);

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

  // console.log('finished assigning stimuli');

  return rows;
}
