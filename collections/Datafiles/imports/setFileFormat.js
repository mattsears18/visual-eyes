export default function setFileFormat(rawCSVData) {
  console.log('Datafile.setFileFormat()');
  if (!this.isText) {
    this.status = 'unrecognizedFileFormat';
    Datafiles.update(
      { _id: this._id },
      { $set: { status: 'unrecognizedFileFormat' } }
    );
  } else if (!this.fileFormat) {
    this.fileFormat = this.detectFileFormat(rawCSVData);
    Datafiles.update(
      { _id: this._id },
      { $set: { fileFormat: this.fileFormat } }
    );
  }

  return this.fileFormat;
}
