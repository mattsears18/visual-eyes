import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'datafiles.setStudyId'({ datafileId, studyId }) {
    datafile = Datafiles.findOne({_id: datafileId});

    if(datafile) {
      console.log('datafile._id: ' + datafile._id + ' FOUND');

      Datafiles.update({_id: datafileId},
        {
          $set: {
            "studyId": studyId,
          },
        },
        function(err, num) {
          var job = new Job(Jobs, 'datafiles.process',
            { datafileId: datafileId, }
          );

          job.priority('normal')
            .save();               // Commit it to the server
        }
      );
    } else {
      console.log('datafile._id: ' + datafileId + ' NOT FOUND');
    }
  },
});
