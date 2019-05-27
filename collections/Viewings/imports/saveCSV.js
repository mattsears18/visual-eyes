import FileSaver from 'file-saver';

const json2csv = require('json2csv').parse;

export default function saveCSV(opt) {
  console.log(this.participant().name);

  const exportData = this.getExportData(opt);

  let csvContent;

  try {
    csvContent = json2csv(exportData);
  } catch (err) {
    console.error(err);
  }

  // Set default file name for organizing later
  const includeIncomplete = opt.includeIncomplete ? 'True' : 'False';

  const nameFile = `${this.study().name} - ${this.analysis().name} - p${
    opt.period
  }ts${opt.timestep}incomplete${includeIncomplete} - ${
    this.participant().name
  } - ${this.stimulus().name} - viewing${this.number}`;

  if (Meteor.isClient) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    // Save file to user's disk
    FileSaver.saveAs(blob, nameFile);
  }
}
