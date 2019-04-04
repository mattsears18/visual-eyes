const csv = require('csvtojson');

export default function removeHeaders() {
  console.log('remove datafile headers. datafileId: ' + this._id);

  let data = fs.readFileSync(this.path, 'utf-8');
  let lines = data.toString().split("\n");
  if(lines[0].substr(0, 6) == '#Study') {
    console.log('Has iMotions header. Remove it.');

    // Remove top 5 lines
    let dataNoHeader = lines.slice(5).join('\n');
    fs.writeFileSync(this.path, dataNoHeader);

    this.headersRemoved = true;
    this.fileFormat = 'imotions';

    Datafiles.update({ _id: this._id }, { $set: { headersRemoved: true, fileFormat: 'imotions' }});
  } else {
    if(lines[0].substr(0, 11) == '## [BeGaze]') {
      console.log('Has BeGaze header. Remove it.');

      // Remove top 4 lines
      let dataNoHeader = lines.slice(4).join('\n');
      fs.writeFileSync(this.path, dataNoHeader);

      this.headersRemoved = true;
      this.fileFormat = 'smi';

      Datafiles.update({ _id: this._id }, { $set: { headersRemoved: true, fileFormat: 'smi' }});
    } else {
      console.log('Does not have iMotions header or BeGaze header. Assume it has no header at all...');
    }
  }
}
