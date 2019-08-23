import helpers from '../../../lib/helpers';

const csv = require('csvtojson');

export default async function process() {
  await this.prepareToProcess();

  // const gazepoints = await this.makeGazepoints();
  const eyeevents = await this.makeEyeevents();
  // const fixations = await this.makeFixations();

  // console.log(
  //   `made ${helpers.formatNumber(
  //     gazepoints.count(),
  //   )} gazepoints and ${helpers.formatNumber(eyeevents.count())} eyeevents`,
  // );

  this.status = 'processed';
  Datafiles.update({ _id: this._id }, { $set: { status: 'processed' } });

  return this;
}
