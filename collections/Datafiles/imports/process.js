import helpers from '../../../lib/helpers';

const csv = require('csvtojson');

export default async function process() {
  this.status = 'needsProcessing';
  delete this.headersRemoved;
  delete this.fileFormat;
  delete this.rawRowCount;
  delete this.gazepointCount;
  delete this.fixationCount;

  Datafiles.update({ _id: this._id }, { $set: { status: 'preprocessing' } });

  this.removeHeaders();
  await this.setFileFormat();

  if (this.status === 'unrecognizedFileFormat') {
    throw new Error('unrecognizedFileFormat');
  }

  const study = Studies.findOne({ _id: this.studyId });
  if (!study) {
    throw new Error('noStudy');
  }

  // console.log('remove any old gazepoints');
  Gazepoints.remove({ datafileId: this._id });

  // console.log('pull datafileId from any old stimuli');
  Stimuli.update({}, { $pull: { datafileIds: this._id } }, { multi: true });

  // console.log('pull datafileId from any old participants');
  Participants.update(
    {},
    { $pull: { datafileIds: this._id } },
    { multi: true },
  );

  this.participantId = helpers.findOrInsert('participants', {
    name: this.getName(),
    studyId: this.studyId,
  });

  Participants.update(
    { _id: this.participantId },
    {
      $addToSet: { datafileIds: this._id },
    },
  );

  Datafiles.update(
    { _id: this._id },
    {
      $set: {
        participantId: this.participantId,
      },
    },
    (err, num) => {
      if (err) {
        console.log(err);
      }
    },
  );

  Datafiles.update({ _id: this._id }, { $set: { status: 'processing' } });

  const gazepoints = await this.makeGazepoints();
  // const fixations = await this.makeFixations();
  // console.log('made ' + helpers.formatNumber(gazepoints.count()) + ' gazepoints');

  this.status = 'processed';
  Datafiles.update({ _id: this._id }, { $set: { status: 'processed' } });

  return this;
}
