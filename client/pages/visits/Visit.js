import Visits from '../../../collections/Visits/Visits';

// Template.Visit.onCreated(function() {
//   this.visit = new ReactiveVar();

//   this.autorun(() => {
//     this.visit.set();
//     this.subscribe(
//       'visits.single.withFixations',
//       Template.currentData().visitId,
//     );

//     if (this.subscriptionsReady()) {
//       const visit = Visits.findOne({
//         _id: Template.currentData().visitId,
//       });

//       if (visit) {
//         this.visit.set(visit);
//       }
//     }
//   });
// });

// Template.Visit.helpers({
//   visit: () => Template.instance().visit.get(),
//   hullParams: () => Template.currentData().hullParams,
// });

Template.Visit.onCreated(function() {
  const studyId = FlowRouter.getParam('studyId');
  const analysisId = FlowRouter.getParam('analysisId');
  const participantId = FlowRouter.getParam('participantId');
  const number = FlowRouter.getParam('number');

  const self = this;

  self.autorun(function() {
    self.subscribe(
      'visits.byStudyIdAnalysisIdParticipantIdNumber',
      studyId,
      analysisId,
      participantId,
      number,
    );
  });
});

Template.Visit.helpers({
  visit: () => Visits.findOne(),
});
