Template.StimuliList.helpers({
  study: () => {
    return Studies.findOne();
  },
  stimuli: () => {
    return Stimuli.find({}, { sort: { name: 1 }});
  },
});
