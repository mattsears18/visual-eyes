import FileSaver from 'file-saver';

const json2csv = require('json2csv').parse;
const JSZip = require('jszip');

const zip = new JSZip();

export default function saveCSV(opt) {
  const { groupBy } = opt || {};
  const { period } = opt || {};
  const { timestep } = opt || {};
  const { type } = opt || {};
  const includeIncompleteText = opt.includeIncomplete ? 'True' : 'False';

  if (type === 'individualZip' && groupBy === 'glance') {
    // eslint-disable-next-line no-lonely-if
    const glances = Glances.find({ analysisId: this._id }).fetch();

    // Set default file name for organizing later
    const includeIncomplete = opt.includeIncomplete ? 'True' : 'False';

    glances.forEach(function(glance) {
      const nameFile = `${glance.study().name} - ${
        glance.analysis().name
      } - p${opt.period}ts${opt.timestep}incomplete${includeIncomplete} - ${
        glance.participant().name
      } - ${glance.stimulus().name} - glance${glance.number}.csv`;

      const csvContent = json2csv(glance.getExportData(opt));
      zip.file(nameFile, csvContent);
    });

    zip.generateAsync({ type: 'blob' }).then((blob) => {
      // 1) generate the zip file
      const zipName = `${this.study().name} - ${this.name} - p${opt.period}ts${
        opt.timestep
      }incomplete${includeIncomplete} - samplingStep${opt.samplingStep}`;

      saveAs(blob, zipName); // 2) trigger the download
    });
  } else if (type === 'summary') {
    const exportData = this.getExportData(opt);

    let filename = `${this.study().name} - ${this.name}`;
    let csvContent;

    if (period) {
      filename += ` - p${period}ts${timestep}incomplete${includeIncompleteText}`;
    }

    if (groupBy === 'glance') {
      filename += ' - glanceSummary';
    } else if (groupBy === 'participant') {
      filename += ' - participantSummary';
    }

    try {
      csvContent = json2csv(exportData);
    } catch (err) {
      console.error(err);
    }

    console.log(filename);

    if (Meteor.isClient) {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      FileSaver.saveAs(blob, filename);
    }
  }
}
