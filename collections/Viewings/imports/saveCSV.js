import FileSaver from 'file-saver';

export default function saveCSV(opt) {
  opt = opt || {};

  const csvContent = this.getHullseries(opt).getCSV();
  if (Meteor.isServer) {
    // Save file on the server with default filename for analysis in R
    fs.writeFile(`${process.env.PWD}/lastViewing.csv`, csvContent, function(err) {
      if (err) {
        return console.log(err);
      }
    });
  }

  if (Meteor.isClient) {
    // Set default file name for organizing later
    let nameFile = `${this.study().name} - vg${this.analysis().viewingGap}mvt${
      this.analysis().minViewingTime}p${opt.period}ts${opt.timestep}`;

    if (opt.includeIncomplete) {
      nameFile += 'incomplete';
    }
    nameFile = `${nameFile} - Viewing - ${this.participant().name}`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    // Save file to user's disk
    FileSaver.saveAs(blob, nameFile);
  }
}
