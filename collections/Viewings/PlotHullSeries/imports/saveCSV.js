import FileSaver from 'file-saver';

export default function saveCSV() {
  console.log('saveCSV');
  // console.log('instantContinuous: ' + this.instantContinuous);
  // console.log('slideStep: ' + this.slideStep);
  // console.log('centroidPeriod: ' + this.centroidPeriod);
  // console.log('fixationTrailLength: ' + this.fixationTrailLength);

  console.log(this);

  // let csvContent = this.getCSV();
  // console.log(csvContent);
}









//
// Meteor.methods({
//   'viewings.saveCSV' ({ viewingId, instantContinuous, slideStep, centroidPeriod, callback }) {
//     check(viewingId, String);
//     check(instantContinuous, String);
//     check(slideStep, String);
//     check(centroidPeriod, Number);
//
//     let viewing = Viewings.findOne({ _id: viewingId });
//
//     if(viewing) {
//       var csvContent = viewing.plotHullSeries().getCSV();
//
//       if(Meteor.isServer) {
//         // Save file on the server with default filename for analysis in R
//         fs.writeFile(process.env['PWD'] + '/lastViewingExport.csv', csvContent, function(err) {
//           if(err) {
//             return console.log(err);
//           }
//         });
//       }
//
//       if(Meteor.isClient) {
//         // Set default file name for organizing later
//         // let nameFile = 'p' + analysis.period + 'vg' + analysis.viewingGap + 'mvt' + analysis.minViewingTime + ' - ' + analysis.name;
//         let nameFile = 'hulls' + viewingId;
//         var blob = new Blob([csvContent], {type: "text/csv;charset=utf-8"});
//         // Save file to user's disk
//         FileSaver.saveAs(blob, nameFile);
//       }
//     }
//   },
// });
