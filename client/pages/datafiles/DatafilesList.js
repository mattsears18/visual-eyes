Template.DatafilesList.helpers({
  study: () => {
    return Studies.findOne();
  },
  datafiles: () => {
    return Datafiles.find({}, { sort: { name: 1 }});
  },
});


Template.DatafilesList.events({
  'click .reprocess-datafiles': function() {
    Meteor.call('studies.reprocessDatafiles', { studyId: study._id });
  }
});
