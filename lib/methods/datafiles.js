Meteor.methods({
  'datafiles.process'({ datafileId }) {
    datafile = Datafiles.findOne({_id: datafileId});


    if(Meteor.isServer) {
      Papa.parse(datafile.link(), {
      	download: true,
        header: true,
        // delimiter: ',',
        complete: function(results, file) {
          console.log('shit balls');
          console.log(results);
          // console.log(b);
          // console.log(c);
        },
      });

    }

    // HTTP.call('GET', datafile.link(), (error, resp) => {
    //   if (error) {
    //     console.error(error);
    //   } else {
    //     if (!~[500, 404, 400].indexOf(resp.statusCode)) {
    //       console.log(resp.content);
    //
    //       //TODO parse file for new aois, insert as necessary
    //       //TODO parse file for new participants, insert as necessary
    //       //TODO parse file for new viewings, insert as necessary
    //
    //       Datafiles.update({_id: datafile._id}, {
    //         $set: {
    //           "processed": true,
    //         },
    //       });
    //     }
    //   }
    // });
  },
});
