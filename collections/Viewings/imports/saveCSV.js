import FileSaver from 'file-saver';

const json2csv = require('json2csv').parse;

export default function saveCSV(opt) {
  const exportData = this.getExportData(opt);

  let csvContent;

  try {
    csvContent = json2csv(exportData);
  } catch (err) {
    console.error(err);
  }

  if (Meteor.isServer) {
    // Save file on the server with default filename for analysis in R
    fs.writeFile(`${process.env.PWD}/lastViewingData.csv`, csvContent, function(
      err,
    ) {
      if (err) {
        return console.log(err);
      }
    });
  }

  if (Meteor.isClient) {
    // Set default file name for organizing later
    const includeIncomplete = opt.includeIncomplete ? 'True' : 'False';

    const nameFile = `${this.study().name} - ${this.analysis().name} - p${
      opt.period
    }ts${opt.timestep}incomplete${includeIncomplete} - ${
      this.participant().name
    } - ${this.stimulus().name} - viewing${this.number}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    // Save file to user's disk
    FileSaver.saveAs(blob, nameFile);
  }
}
