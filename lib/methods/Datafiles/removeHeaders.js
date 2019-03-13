const csv = require('csvtojson');

Meteor.methods({
  'datafiles.removeHeaders'({ datafileId }) {
    check(datafileId, String);

    if(Meteor.isServer) {
      datafile = Datafiles.findOne({ _id: datafileId });

      if(datafile) {
        console.log('remove datafile headers: ' + datafile._id);

        data = fs.readFileSync(datafile.path, 'utf-8');
        lines = data.toString().split("\n");
        if(lines[0].substr(0, 6) == '#Study') {
          console.log('Has iMotions header. Remove it.');

          // Remove top 5 lines
          dataNoHeader = lines.slice(5).join('\n');
          fs.writeFileSync(datafile.path, dataNoHeader);

          Datafiles.update({ _id: datafile._id }, { $set: { headersRemoved: true, fileFormat: 'imotions' }});
        } else {
          if(lines[0].substr(0, 11) == '## [BeGaze]') {
            console.log('Has BeGaze header. Remove it.');

            // Remove top 4 lines
            dataNoHeader = lines.slice(4).join('\n');
            fs.writeFileSync(datafile.path, dataNoHeader);

            Datafiles.update({ _id: datafile._id }, { $set: { headersRemoved: true, fileFormat: 'smi' }});
          } else {
            console.log('Does not have iMotions header or BeGaze header. Assume it has no header at all...');
            Datafiles.update({ _id: datafile._id }, { $set: { headersRemoved: true }});
          }
        }
      }
    }
  },
});
