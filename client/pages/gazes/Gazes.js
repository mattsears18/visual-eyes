import { template } from 'handlebars';

Template.Gazes.onCreated(function() {
  this.gaze = new ReactiveVar();
  this.period = new ReactiveVar(5000);
  this.timestep = new ReactiveVar(0);
  this.includeIncomplete = new ReactiveVar(false);
  this.pointTrailLength = new ReactiveVar(10);
  this.hullParams = new ReactiveVar();

  this.autorun(() => {
    const studyId = FlowRouter.getParam('studyId');
    this.subscribe('studies.single', studyId);

    const analysisId = FlowRouter.getParam('analysisId');
    this.subscribe('analyses.single', analysisId);
    this.subscribe('participants.byAnalysisId', analysisId);
    this.subscribe('stimuli.byAnalysisId', analysisId);

    this.subscribe('gazes.simple.byParams', {
      analysisId: FlowRouter.getParam('analysisId'),
    });

    if (this.subscriptionsReady() && Gazes.find().count()) {
      const gaze = Gazes.findOne({
        participantId: FlowRouter.getParam('participantId'),
        stimulusId: FlowRouter.getParam('stimulusId'),
        number: parseInt(FlowRouter.getParam('number')),
      });

      if (gaze) {
        this.gaze.set(gaze);
        this.hullParams.set({
          period: parseInt(Template.instance().period.get()),
          timestep: parseInt(Template.instance().timestep.get()),
          includeIncomplete: Template.instance().includeIncomplete.get(),
          pointTrailLength: parseInt(
            Template.instance().pointTrailLength.get(),
          ),
        });
      } else if (parseInt(FlowRouter.getParam('number')) > 1) {
        FlowRouter.setParams({ number: '1' });
      }
    }
  });
});

Template.Gazes.helpers({
  gaze: () => Template.instance().gaze.get(),
  gazeCount: () => Gazes.find({
    participantId: FlowRouter.getParam('participantId'),
    stimulusId: FlowRouter.getParam('stimulusId'),
  }).count(),
  participant: () => Participants.findOne({ _id: FlowRouter.getParam('participantId') }),
  stimulus: () => Stimuli.findOne({ _id: FlowRouter.getParam('stimulusId') }),
  number: () => parseInt(FlowRouter.getParam('number')),
  period: () => Template.instance().period.get(),
  timestep: () => Template.instance().timestep.get(),
  includeIncomplete: () => Template.instance().includeIncomplete.get(),
  pointTrailLength: () => Template.instance().pointTrailLength.get(),
  hullParams: () => Template.instance().hullParams.get(),
});

Template.BreadCrumbs.helpers({
  study: () => Studies.findOne(),
  analysis: () => Analyses.findOne(),
});

Template.Gazes.events({
  'click .update-gaze': () => {
    Session.set('updateGaze', true);
  },
  'click .participant.next': (e, t) => {
    const ids = Participants.find()
      .fetch()
      .map(p => p._id);
    let index = ids.indexOf(FlowRouter.getParam('participantId'));
    if (index === ids.length - 1) {
      index = 0;
    } else {
      index++;
    }

    FlowRouter.setParams({ participantId: ids[index] });
  },
  'click .participant.previous': (e, t) => {
    const ids = Participants.find()
      .fetch()
      .map(p => p._id);
    let index = ids.indexOf(FlowRouter.getParam('participantId'));
    if (index === 0) {
      index = ids.length - 1;
    } else {
      index--;
    }

    FlowRouter.setParams({ participantId: ids[index] });
  },
  'click .stimulus.next': (e, t) => {
    const ids = Stimuli.find()
      .fetch()
      .map(p => p._id);
    let index = ids.indexOf(FlowRouter.getParam('stimulusId'));
    if (index === ids.length - 1) {
      index = 0;
    } else {
      index++;
    }

    FlowRouter.setParams({ stimulusId: ids[index] });
  },
  'click .stimulus.previous': (e, t) => {
    const ids = Stimuli.find()
      .fetch()
      .map(p => p._id);
    let index = ids.indexOf(FlowRouter.getParam('stimulusId'));
    if (index === 0) {
      index = ids.length - 1;
    } else {
      index--;
    }

    FlowRouter.setParams({ stimulusId: ids[index] });
  },
  'click .number.next': () => {
    if (
      parseInt(FlowRouter.getParam('number'))
      === Gazes.find({
        participantId: FlowRouter.getParam('participantId'),
        stimulusId: FlowRouter.getParam('stimulusId'),
      }).count()
    ) {
      FlowRouter.setParams({ number: 1 });
    } else {
      FlowRouter.setParams({
        number: parseInt(FlowRouter.getParam('number')) + 1,
      });
    }
  },
  'click .number.previous': () => {
    if (parseInt(FlowRouter.getParam('number')) === 1) {
      FlowRouter.setParams({
        number: Gazes.find({
          participantId: FlowRouter.getParam('participantId'),
          stimulusId: FlowRouter.getParam('stimulusId'),
        }).count(),
      });
    } else {
      FlowRouter.setParams({
        number: parseInt(FlowRouter.getParam('number')) - 1,
      });
    }
  },
});

Template.Gazes.destroyed = function() {
  Session.set('updateGaze', false);
};

Template.Gazes.events({
  'change .reactive': (event, templateInstance) => {
    let value;
    if (event.target.type === 'checkbox') {
      value = event.target.checked;
    } else if (event.target.value === '') {
      value = 0;
    } else {
      value = event.target.value;
    }

    templateInstance[event.target.id].set(value);
    $(`#${event.target.id}`).val(value);
  },
});
