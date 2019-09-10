const fs = require('fs');

export default function removeHeaders() {
  if (Meteor.isServer) console.log('Datafile.removeHeaders()');

  const data = fs.readFileSync(this.getPathFilename(), 'utf-8');
  const lines = data.toString().split('\n');
  if (lines[0].substr(0, 6) === '#Study') {
    // console.log('Has iMotions header. Remove it.');

    // Remove top 5 lines
    const dataNoHeader = lines.slice(5).join('\n');
    fs.writeFileSync(this.getPathFilename(), dataNoHeader);

    this.headersRemoved = true;
    this.fileFormat = 'imotions';

    Datafiles.update(
      { _id: this._id },
      { $set: { headersRemoved: true, fileFormat: 'imotions' } },
    );
  } else if (lines[0].substr(0, 11) === '## [BeGaze]') {
    // console.log('Has BeGaze header. Remove it.');

    // Remove top 4 lines
    const dataNoHeader = lines.slice(4).join('\n');
    fs.writeFileSync(this.getPathFilename(), dataNoHeader);

    this.headersRemoved = true;
    this.fileFormat = 'smi';

    Datafiles.update(
      { _id: this._id },
      { $set: { headersRemoved: true, fileFormat: 'smi' } },
    );
  } else {
    // console.log(
    //   'Does not have iMotions header or BeGaze header. Assume it has no header at all...',
    // );
    this.headersRemoved = true;
    Datafiles.update({ _id: this._id }, { $set: { headersRemoved: true } });
  }

  if (this.fileFormat) {
    console.log(`file format: ${this.fileFormat}`);
  }
}
