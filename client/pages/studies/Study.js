import { $ } from 'meteor/jquery';
import dataTablesBootstrap from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
dataTablesBootstrap(window, $);


Template.Study.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('studies.single', studyId);
    self.subscribe('files.datafiles.byStudyId', studyId);
    self.subscribe('aois.byStudyId', studyId);
  });
});

Template.Study.helpers({
  study: () => {
    return Studies.findOne();
  },
  datafiles: () => {
    return Datafiles.find();
  },
  aois: () => {
    return Aois.find({}, {sort: {name: 1}});
  },
  recordings: () => {
    return Recordings.find({}, {sort: {aoiName: 1}});
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
  }
});

Template.Study.destroyed = function(){
  Session.set('updateStudy', false);
}
