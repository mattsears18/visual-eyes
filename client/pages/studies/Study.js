import { $ } from 'meteor/jquery';
import dataTablesBootstrap from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
dataTablesBootstrap(window, $);

Template.Study.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');

    study = Studies.findOne(studyId);
    // if(!study) { FlowRouter.go('/studies'); }

    self.subscribe('studies.single', studyId);
    self.subscribe('files.datafiles.byStudyId', studyId);
    self.subscribe('aois.byStudyId', studyId);
    self.subscribe('analyses.byStudyId', studyId);
  });
});

Template.Study.helpers({
  study: () => {
    return Studies.findOne();
  },
  datafiles: () => {
    return Datafiles.find({}, { sort: { name: 1 }});
  },
  aois: () => {
    return Aois.find({}, { sort: { name: 1 }});
  },
  analyses: () => {
    return Analyses.find({}, { sort: { createdAt: -1 }});
  },
  recordings: () => {
    return Recordings.find({}, { sort: { aoiName: 1 }});
  },
});

Template.BreadCrumbs.helpers({
  study: () => {
    return Studies.findOne();
  },
});

Template.Study.events({
  'click .update-study': function() {
    Session.set('updateStudy', true);
  },
  'click .new-analysis': function() {
    Session.set('newAnalysis', true);
  }
});

Template.Study.destroyed = function(){
  Session.set('updateStudy', false);
  Session.set('newAnalysis', false);
}
