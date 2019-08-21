import FileSaver from 'file-saver';

const json2csv = require('json2csv').parse;
const JSZip = require('jszip');

const zip = new JSZip();

export default function saveCSV(opt) {
  const { type } = opt || {};
  const { groupBy } = opt || {};

  console.log(type);

  let exportData;

  if (type === 'allAnalysesSingle') {
    exportData = this.analyses().fetch();
  }

  if (exportData) {
    const filename = `${this.name} - visit statistics summary`;
    let csvContent;

    try {
      csvContent = json2csv(exportData);
    } catch (err) {
      console.error(err);
    }

    if (Meteor.isClient) {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      FileSaver.saveAs(blob, filename);
    }
  }
}
