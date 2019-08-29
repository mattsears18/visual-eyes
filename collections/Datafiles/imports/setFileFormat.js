export default function setFileFormat(rawCsvData) {
  if (!Meteor.isTest) console.log('Datafile.setFileFormat()');
  if (!this.isText) {
    this.status = 'unrecognizedFileFormat';
    Datafiles.update(
      { _id: this._id },
      { $set: { status: 'unrecognizedFileFormat' } },
    );
  } else if (!this.fileFormat) {
    this.fileFormat = this.detectFileFormat(rawCsvData);
    Datafiles.update(
      { _id: this._id },
      { $set: { fileFormat: this.fileFormat } },
    );
  }

  return this.fileFormat;
}
