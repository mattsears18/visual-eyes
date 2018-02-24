Meteor.methods({
  'studies.doCalcs'({ studyId }) {
    study = Studies.findOne({_id: studyId});

    console.log(study.datafile());
  },
});
