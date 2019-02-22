Template.DatafilesList.helpers({
  study: () => {
    return Studies.findOne();
  },
  datafiles: () => {
    return Datafiles.find({}, { sort: { name: 1 }});
  },
});
