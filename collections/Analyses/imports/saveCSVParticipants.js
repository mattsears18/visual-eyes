import FileSaver from 'file-saver';
import fs from 'fs';

/**
 *
 * @param { object } opt
 */
export default function saveCSVParticipants(opt) {
  // eslint-disable-next-line no-param-reassign
  opt = opt || {};

  const csvContent = this.getCSVParticipants();

  if (Meteor.isServer) {
    // Save file on the server with default filename for analysis in R
    fs.writeFile(
      `${process.env.PWD}/lastAnalysisParticipants.csv`,
      csvContent,
      function(err) {
        if (err) {
          return console.log(err);
        }
      },
    );
  }

  if (Meteor.isClient) {
    // Set default file name for organizing later
    const nameFile = `${this.study().name} - vg${this.viewingGap}mvt${
      this.minViewingTime
    } - Participants`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    // Save file to user's disk
    FileSaver.saveAs(blob, nameFile);
  }
}
