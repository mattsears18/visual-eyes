import helpers from '../../../lib/helpers';
import Eyeevents from '../../Eyeevents/Eyeevents';

const csv = require('csvtojson');

export default async function process() {
  const rawCsvData = await this.getRawCSV();

  this.preProcess(rawCsvData);

  const statuses = this.makeEyeevents(rawCsvData);
  const eyeeventsStatus = await statuses.eyeeventsStatus;
  const gazepointsStatus = await statuses.gazepointsStatus;

  if (eyeeventsStatus.ok && gazepointsStatus.ok) {
    const blinkCount = Eyeevents.find({
      datafileId: this._id,
      type: 'blink',
    }).count();

    const saccadeCount = Eyeevents.find({
      datafileId: this._id,
      type: 'saccade',
    }).count();

    const fixationCount = Eyeevents.find({
      datafileId: this._id,
      type: 'fixation',
    }).count();

    const gazepointCount = Gazepoints.find({
      datafileId: this._id,
    }).count();

    console.log(`blinks: ${blinkCount}`);
    console.log(`saccades: ${saccadeCount}`);
    console.log(`fixations: ${fixationCount}`);
    console.log(`gazepoints: ${gazepointCount}`);

    Datafiles.update(
      { _id: this._id },
      {
        $set: {
          status: 'processed',
          blinkCount,
          saccadeCount,
          fixationCount,
          gazepointCount,
        },
      },
    );
  } else {
    console.log('bulk insert error!');

    Datafiles.update({ _id: this._id }, { $set: { status: 'failed' } });
  } // TODO need to check the status in the job runner to determine whether to call job.done() or retry it

  return Datafiles.findOne({ _id: this._id });
}
