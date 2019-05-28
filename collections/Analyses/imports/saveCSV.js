import FileSaver from 'file-saver';

const json2csv = require('json2csv').parse;
const JSZip = require('jszip');

const zip = new JSZip();

export default function saveCSV(opt) {
  const { individual } = opt || {};
  const { groupBy } = opt || {};
  const { period } = opt || {};
  const { timestep } = opt || {};
  const { type } = opt || {};

  if (groupBy === 'participant') {
    if (type === 'summary') {
      const exportData = this.getExportData(opt);

      let csvContent;

      try {
        csvContent = json2csv(exportData);
      } catch (err) {
        console.error(err);
      }

      // Set default file name for organizing later
      const includeIncomplete = opt.includeIncomplete ? 'True' : 'False';

      let filename = `${this.study().name} - ${this.name}`;

      if (period) {
        filename += ` - p${
          opt.period
        }ts${timestep}incomplete${includeIncomplete} - participantSummary`;
      }

      if (Meteor.isClient) {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        FileSaver.saveAs(blob, filename);
      }
    }
  } else if (groupBy === 'viewing') {
    if (type === 'individualZip') {
      // eslint-disable-next-line no-lonely-if
      const viewings = Viewings.find({ analysisId: this._id }).fetch();

      // Set default file name for organizing later
      const includeIncomplete = opt.includeIncomplete ? 'True' : 'False';

      viewings.forEach(function(viewing) {
        const nameFile = `${viewing.study().name} - ${
          viewing.analysis().name
        } - p${opt.period}ts${opt.timestep}incomplete${includeIncomplete} - ${
          viewing.participant().name
        } - ${viewing.stimulus().name} - viewing${viewing.number}.csv`;

        console.log(
          `${viewing.participant().name} - ${viewing.stimulus().name} - ${
            viewing.number
          }`,
        );

        const csvContent = json2csv(viewing.getExportData(opt));
        zip.file(nameFile, csvContent);
      });

      zip.generateAsync({ type: 'blob' }).then((blob) => {
        // 1) generate the zip file
        const zipName = `${this.study().name} - ${this.name} - p${
          opt.period
        }ts${opt.timestep}incomplete${includeIncomplete} - samplingStep${
          opt.samplingStep
        }`;

        saveAs(blob, zipName); // 2) trigger the download
      });
    } else if (type === 'summary') {
      console.log('make a summary');
    }
  }
}
