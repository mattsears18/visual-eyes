import helpers from '../../../lib/helpers';

const csv = require('csvtojson');

export default async function process() {
  const rawCsvData = await this.getRawCSV();

  this.preProcess(rawCSVData);

  const eyeevents = this.makeEyeevents(rawCSVData);
  // const gazepoints = await this.makeGazepoints();
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
