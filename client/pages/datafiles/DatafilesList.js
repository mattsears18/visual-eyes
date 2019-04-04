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
    study.reprocessDatafiles();
  },
  'click .upload-datafiles': function() {
    Session.set('uploadingDatafiles', true);
    $('#datafileInput').click();
  },
  'click .delete-datafile': function(e, template) {
    if (confirm('Really delete "' + e.target.dataset.datafilename + '"?')) {
      Datafiles.remove({ _id: e.target.dataset.datafileid });
    }
  }
});

Template.DatafilesList.destroyed = function() {
  Session.set('uploadingDatafiles', false);
}
