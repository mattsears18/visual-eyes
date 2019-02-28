import FileSaver from 'file-saver';

Meteor.methods({
  'analyses.saveCSV'({ analysisId }) {
    check(analysisId, String);

    analysis = Analyses.findOne(analysisId);

    if(analysis) {
      var csvContent = CSV.unparse(analysis.getDataAsCSV());

      if(Meteor.isServer) {
        // Save file on the server with default filename for analysis in R
        fs.writeFile(process.env['PWD'] + '/lastAnalysisExport.csv', csvContent, function(err) {
          if(err) {
            return console.log(err);
          }
        });
      }

      if(Meteor.isClient) {
        // Set default file name for organizing later
        nameFile = 'p' + analysis.period + 'vg' + analysis.viewingGap + 'mvt' + analysis.minViewingTime + ' - ' + analysis.name;
        var blob = new Blob([csvContent], {type: "text/csv;charset=utf-8"});
        // Save file to user's disk
        FileSaver.saveAs(blob, nameFile);
      }
    }
  },
});
