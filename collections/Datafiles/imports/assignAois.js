import helpers from '../../../lib/helpers';

export default function assignAois(rowsWithStimuli) {
  console.log('Datafile.assignAois()');
  const rows = [...rowsWithStimuli];

  let aois = Aois.find({ studyId: this.studyId }).fetch();

  for (let i = 0; i < rows.length; i += 1) {
    if (!rows[i].stimulusId) {
      throw new Error('missingStimulusId');
    }
    // assign '-' name if aoi name is blank
    rows[i].aoiName = rows[i].aoiName || '-';

    let aoi = aois.find(
      doc => doc.name === rows[i].aoiName && doc.stimulusId === rows[i].stimulusId,
    );

    if (!aoi) {
      const aoiId = helpers.findOrInsert('aois', {
        name: rows[i].aoiName,
        stimulusId: rows[i].stimulusId,
        studyId: this.studyId,
      });

      aoi = {
        name: rows[i].aoiName,
        _id: aoiId,
        stimulusId: rows[i].stimulusId,
      };
      aois.push(aoi);
    }

    rows[i].aoiId = aoi._id;

    if (!aoi.datafileIds || !aoi.datafileIds.includes(this._id)) {
      Aois.update({ _id: aoi._id }, { $addToSet: { datafileIds: this._id } });
      aois = Aois.find({ studyId: this.studyId }).fetch();
    }
  }

  return rows;
}
