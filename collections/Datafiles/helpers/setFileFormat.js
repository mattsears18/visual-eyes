export default async function setFileFormat() {
  if(!this.isText) {
    this.status = 'unrecognizedFileFormat';
    Datafiles.update({ _id: this._id }, { $set: { status: 'unrecognizedFileFormat' }});
  } else {
    if(!this.fileFormat) {
      this.fileFormat = await this.detectFileFormat();
    }
  }

  return this.fileFormat;
}
