const fs = require('fs');
const csv = require('csvtojson');

export default async function detectFormat() {
  let rows = await csv({delimiter: "auto"}).fromFile(this.path);

  if(!this.isText) {
    this.status = 'unrecognizedFileFormat';
    Datafiles.update({ _id: this._id }, { $set: { status: 'unrecognizedFileFormat' }});
  } else {
    if(rows[0].hasOwnProperty('Point of Regard Binocular X [px]')) {
      // console.log('smi file format detected');
      this.fileFormat = 'smi';
      Datafiles.update({ _id: this._id }, { $set: { fileFormat: this.fileFormat }});
    } else if(rows[0].hasOwnProperty('GazeX')) {
      // console.log('imotions file format detected');
      this.fileFormat = 'imotions';
      Datafiles.update({ _id: this._id }, { $set: { fileFormat: this.fileFormat }});
    } else {
      // console.log('No format detected! First row:');
      // console.log(results[0]);
      this.status = 'unrecognizedFileFormat';
      Datafiles.update({ _id: this._id }, { $set: { status: 'unrecognizedFileFormat' }});
    }
  }

  return this.fileFormat;
}
