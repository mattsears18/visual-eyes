Meteor.methods({
  'studies.doCalcs'({ studyId }) {
    study = Studies.findOne({_id: studyId});

    study.datafiles.forEach(function(datafileId) {
      datafile = Datafiles.findOne({_id: datafileId});

      console.log(datafile.link());



      HTTP.call('GET', datafile.link(), (error, resp) => {
        if (error) {
          console.error(error);
        } else {
          if (!~[500, 404, 400].indexOf(resp.statusCode)) {
            console.log(resp.content);

            Datafiles.update({_id: datafile._id}, {
              $set: {"content": resp.content},
            });
          }
        }
      });



    });






  },
});
