import helpers from '../../../lib/helpers';
import Eyeevents from '../../Eyeevents/Eyeevents';

export default async function process() {
  if (Meteor.isServer && !Meteor.isTest) console.log('Datafiles.process()');

  this.preProcess();
  const rawData = await this.getRawData();

  if (!this.fileFormat) {
    this.setFileFormat(rawData);
  }

  let timestampedData;
  if (this.fileFormat === 'smi') {
    timestampedData = this.mergeVideoStimulusRows(rawData);
  } else {
    timestampedData = rawData;
  }

  const renamedRows = this.renameRows(timestampedData);
  const status = await this.makeEyeevents(renamedRows);

  if (status.ok) {
    const blinkCount = Eyeevents.find({
      datafileId: this._id,
      type: 'Blink',
    }).count();

    const saccadeCount = Eyeevents.find({
      datafileId: this._id,
      type: 'Saccade',
    }).count();

    const fixationCount = Eyeevents.find({
      datafileId: this._id,
      type: 'Fixation',
    }).count();

    if (Meteor.isServer && !Meteor.isTest) {
      console.log(`blinks:    ${blinkCount}`);
      console.log(`saccades:  ${saccadeCount}`);
      console.log(`fixations: ${fixationCount}`);
    }

    Datafiles.update(
      { _id: this._id },
      {
        $set: {
          status: 'processed',
          blinkCount,
          saccadeCount,
          fixationCount,
        },
      },
    );
  } else {
    console.log('bulk insert error!');

    Datafiles.update({ _id: this._id }, { $set: { status: 'failed' } });
  }

  // TODO need to check the status in the job runner to determine whether to call job.done() or retry it

  return Datafiles.findOne({ _id: this._id });
}
