const csv = require('csvtojson');

Meteor.methods({
  'datafiles.removeHeadersDetectFormat'({ datafileId }) {
    check(datafileId, String);

    if(Meteor.isServer) {
      let datafile = Datafiles.findOne({ _id: datafileId });

      if(datafile) {
        console.log('remove datafile headers: ' + datafile._id);

        let data = fs.readFileSync(datafile.path, 'utf-8');
        let lines = data.toString().split("\n");
        if(lines[0].substr(0, 6) == '#Study') {
          console.log('Has iMotions header. Remove it.');

          // Remove top 5 lines
          let dataNoHeader = lines.slice(5).join('\n');
          fs.writeFileSync(datafile.path, dataNoHeader);

          Datafiles.update({ _id: datafile._id }, { $set: { headersRemoved: true, fileFormat: 'imotions' }});
        } else {
          if(lines[0].substr(0, 11) == '## [BeGaze]') {
            console.log('Has BeGaze header. Remove it.');

            // Remove top 4 lines
            let dataNoHeader = lines.slice(4).join('\n');
            fs.writeFileSync(datafile.path, dataNoHeader);

            Datafiles.update({ _id: datafile._id }, { $set: { headersRemoved: true, fileFormat: 'smi' }});
          } else {
            console.log('Does not have iMotions header or BeGaze header. Assume it has no header at all...');

            // detect the file format
            csv({delimiter: "auto"})
              .fromFile(datafile.path)
              .then(Meteor.bindEnvironment((results) => {
                let format = detectFormat(results[0]);

                if(typeof(format) == 'undefined') {
                  Datafiles.update({ _id: datafile._id }, { $set: { headersRemoved: true, status: 'unrecognizedFileFormat' }});
                } else {
                  Datafiles.update({ _id: datafile._id }, { $set: { headersRemoved: true, fileFormat: format }});
                }
              }));
          }
        }
      }
    }
  },
});

function detectFormat(row) {
  if(row.hasOwnProperty('Point of Regard Binocular X [px]')) {
    return 'smi';
  } else if(row.hasOwnProperty('GazeX')) {
    return 'imotions';
  } else {
    console.log('No format detected! First row:');
    console.log(row);
  }
}
