import FileSaver from 'file-saver';

Meteor.methods({
  'analyses.saveViewingsCSV'({ analysisId }) {
    check(analysisId, String);

    let analysis = Analyses.findOne(analysisId);

    if(analysis) {
      var csvContent = analysis.getViewingsDataAsCSV();

      if(Meteor.isServer) {
        // Save file on the server with default filename for analysis in R
        fs.writeFile(process.env['PWD'] + '/lastAnalysisViewingsExport.csv', csvContent, function(err) {
          if(err) {
            return console.log(err);
          }
        });
      }

      if(Meteor.isClient) {
        // Set default file name for organizing later
        let nameFile = analysis.study().name  + ' - Viewings - p' + analysis.period + 'vg' + analysis.viewingGap + 'mvt' + analysis.minViewingTime;
        var blob = new Blob([csvContent], {type: "text/csv;charset=utf-8"});
        // Save file to user's disk
        FileSaver.saveAs(blob, nameFile);
      }
    }
  },
});
