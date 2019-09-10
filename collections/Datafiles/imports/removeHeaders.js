const fs = require('fs');

export default function removeHeaders() {
  if (Meteor.isServer && !Meteor.isTest) console.log('Datafile.removeHeaders()');

  const data = fs.readFileSync(this.getPathFilename(), 'utf-8');
  const rows = data.toString().split('\n');

  if (rows[0].substr(0, 6) === '#Study') {
    // console.log('Has iMotions header. Remove it.');

    // Remove top 5 rows
    const dataNoHeader = rows.slice(5).join('\n');
    fs.writeFileSync(this.getPathFilename(), dataNoHeader);

    this.headersRemoved = true;
    this.fileFormat = 'imotions';

    Datafiles.update(
      { _id: this._id },
      { $set: { headersRemoved: true, fileFormat: 'imotions' } },
    );
  } else if (rows[0].substr(0, 11) === '## [BeGaze]') {
    // console.log('Has BeGaze header. Remove it.');

    const firstRealRowIndex = getFirstRealRowIndex(rows);

    // Remove header rows
    const dataNoHeader = rows.slice(firstRealRowIndex).join('\n');

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

function getFirstRealRowIndex(rows) {
  let rowIndex = 0;

  while (rowIndex < rows.length) {
    // console.log(rows[rowIndex]);
    if (rows[rowIndex].substr(0, 18) === 'RecordingTime [ms]') {
      break;
    }
    rowIndex += 1;
  }

  return rowIndex;
}
