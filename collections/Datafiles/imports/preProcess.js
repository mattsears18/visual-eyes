import helpers from '../../../lib/helpers';

export default function preProcess(rawCsvData) {
  console.log('Datafile.preProcess()');

  const study = Studies.findOne({ _id: this.studyId });
  if (!study) {
    throw new Error('noStudy');
  }

  delete this.headersRemoved;
  delete this.fileFormat;
  delete this.rawRowCount;
  delete this.stimulusRowCount;
  delete this.integerRowCount;
  delete this.gazepointCount;
  delete this.fixationCount;

  this.status = 'preprocessing';
  Datafiles.update({ _id: this._id }, { $set: { status: 'preprocessing' } });

  this.removeHeaders();
  this.setFileFormat(rawCsvData);

  if (this.status === 'unrecognizedFileFormat') {
    throw new Error('unrecognizedFileFormat');
  }

  // console.log('remove any old gazepoints');
  Gazepoints.remove({ datafileId: this._id });

  // console.log('pull datafileId from any old stimuli');
  Stimuli.update({}, { $pull: { datafileIds: this._id } }, { multi: true });

  Aois.update({}, { $pull: { datafileIds: this._id } }, { multi: true });

  // console.log('pull datafileId from any old participants');
  Participants.update(
    {},
    { $pull: { datafileIds: this._id } },
    { multi: true }
  );

  this.participantId = helpers.findOrInsert('participants', {
    name: this.getName(),
    studyId: this.studyId
  });

  Participants.update(
    { _id: this.participantId },
    {
      $addToSet: { datafileIds: this._id }
    }
  );

  Datafiles.update(
    { _id: this._id },
    {
      $set: {
        participantId: this.participantId
      }
    },
    (err, num) => {
      if (err) {
        console.log(err);
      }
    }
  );

  this.status = 'processing';
  Datafiles.update({ _id: this._id }, { $set: { status: 'processing' } });
}
