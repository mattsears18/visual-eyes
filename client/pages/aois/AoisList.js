Template.AoisList.helpers({
  study: () => {
    return Studies.findOne();
  },
  aois: () => {
    return Aois.find({}, { sort: { name: 1 }});
  },
});
