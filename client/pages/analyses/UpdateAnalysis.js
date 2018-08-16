Template.UpdateAnalysis.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);
    self.subscribe('aois.byStudyId', studyId);
    self.subscribe('datafiles.byStudyId', studyId);
  });
});

Template.UpdateAnalysis.events({
  'click .fa-close': function() {
    Session.set('updateAnalysis', false);
  }
});

AutoForm.hooks({
  updateAnalysisForm: {
    onSuccess: function(formType, result) {
      Session.set('updateAnalysis', false);
    },
  }
});

Template.UpdateAnalysis.helpers({
  deleteBeforeRemove: function() {
    //TODO replace this alert with a modal
    return function (collection, id) {
      var doc = collection.findOne(id);
      if (confirm('Really delete "' + doc.name + '"?')) {
        this.remove();
        var studyId = FlowRouter.getParam('studyId');
        FlowRouter.go('/studies/' + studyId);
      }
    };
  },
  aoiOptions: function () {
    aois = Aois.find().fetch();
    return aois.map(function(aoi) {
      return { label: aoi.name, value: aoi._id, checked: 'checked' };
    });
  },
  datafileOptions: function () {
    datafiles = Datafiles.find().fetch();
    return datafiles.map(function(datafile) {
      return { label: datafile.name, value: datafile._id, checked: 'checked' };
    });
  },
});
