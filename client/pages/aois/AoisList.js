Template.AoisList.helpers({
  study: () => Studies.findOne(),
  aois: () => Aois.find({}, { sort: { name: 1 } }),
});
