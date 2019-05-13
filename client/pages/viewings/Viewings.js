Template.Viewings.onCreated(function() {
  this.viewing = new ReactiveVar();
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

    this.subscribe('viewings.simple.byParams', {
      analysisId: FlowRouter.getParam('analysisId'),
    });

    if (this.subscriptionsReady() && Viewings.find().count()) {
      const viewing = Viewings.findOne({
        participantId: FlowRouter.getParam('participantId'),
        stimulusId: FlowRouter.getParam('stimulusId'),
        number: parseInt(FlowRouter.getParam('number')),
      });

      if (viewing) {
        this.viewing.set(viewing);
        this.hullParams.set({
          period: parseInt(Template.instance().period.get()),
          timestep: parseInt(Template.instance().timestep.get()),
          includeIncomplete: Template.instance().includeIncomplete.get(),
          pointTrailLength: parseInt(Template.instance().pointTrailLength.get()),
        });
      } else if (parseInt(FlowRouter.getParam('number')) > 1) {
        FlowRouter.setParams({ number: '1' });
      }
    }
  });
});

Template.Viewings.helpers({
  viewing: () => Template.instance().viewing.get(),
  viewingCount: () => Viewings.find({
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

Template.Viewings.events({
  'click .update-viewing': () => {
    Session.set('updateViewing', true);
  },
  'click .participant.next': (e, t) => {
    const ids = Participants.find()
      .fetch()
      .map(p => p._id);
    let index = ids.indexOf(FlowRouter.getParam('participantId'));
    if (index == ids.length - 1) {
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
    if (index == 0) {
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
    if (index == ids.length - 1) {
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
    if (index == 0) {
      index = ids.length - 1;
    } else {
      index--;
    }

    FlowRouter.setParams({ stimulusId: ids[index] });
  },
  'click .number.next': () => {
    if (
      parseInt(FlowRouter.getParam('number'))
      == Viewings.find({
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
    if (parseInt(FlowRouter.getParam('number')) == 1) {
      FlowRouter.setParams({
        number: Viewings.find({
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

Template.Viewings.destroyed = function() {
  Session.set('updateViewing', false);
};

Template.Viewings.events({
  'change .reactive': (e, t) => {
    let value;
    if (e.target.type == 'checkbox') {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    t[e.target.id].set(value);
  },
});
