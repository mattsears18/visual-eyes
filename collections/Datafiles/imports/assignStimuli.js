import helpers from '../../../lib/helpers';

export default function assignStimuli(rawRows) {
  const rows = [...rawRows];

  const stimuli = Stimuli.find({ studyId: this.studyId }).fetch();

  for (let i = 0; i < rows.length; i += 1) {
    const stimulus = stimuli.find(row => row.name === rows[i].stimulusName);

    if (typeof stimulus === 'undefined') {
      const newStimulusId = helpers.findOrInsert('stimuli', {
        name: rows[i].stimulusName,
        studyId: this.studyId,
      });

      stimuli.push({ name: rows[i].stimulusName, _id: newStimulusId });
      rows[i].stimulusId = newStimulusId;
    } else {
      rows[i].stimulusId = stimulus._id;
    }
  }

  return rows;
}
