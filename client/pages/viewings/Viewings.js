Template.Viewings.onCreated(function() {
  this.viewing = new ReactiveVar();
  this.period = new ReactiveVar(5000);
  this.timestep = new ReactiveVar(0);
  this.includeIncomplete = new ReactiveVar(false);
  this.pointTrailLength = new ReactiveVar(10);

  this.autorun(() => {
    let studyId = FlowRouter.getParam('studyId');
    this.subscribe('studies.single', studyId);

    let analysisId = FlowRouter.getParam('analysisId');
    this.subscribe('analyses.single', analysisId);
    this.subscribe('participants.byAnalysisId', analysisId);
    this.subscribe('stimuli.byAnalysisId', analysisId);

    this.subscribe('viewings.simple.byParams', {
      analysisId: FlowRouter.getParam('analysisId'),
    });

    if(this.subscriptionsReady && Viewings.find().count()) {
      let viewing = Viewings.findOne({
        participantId: FlowRouter.getParam('participantId'),
        stimulusId: FlowRouter.getParam('stimulusId'),
        number: parseInt(FlowRouter.getParam('number')),
      });

      if(viewing) {
        this.viewing.set(viewing);
      } else {
        if(parseInt(FlowRouter.getParam('number')) > 1) {
          FlowRouter.setParams({ number: '1' });
        }
      }
    }
  });
});

Template.Viewings.helpers({
  viewing: () => { return Template.instance().viewing.get() },
  viewingCount: () => {
    return Viewings.find({
      participantId: FlowRouter.getParam('participantId'),
      stimulusId: FlowRouter.getParam('stimulusId'),
    }).count()
  },
  participant: () => { return Participants.findOne({ _id: FlowRouter.getParam('participantId') }) },
  stimulus: () => { return Stimuli.findOne({ _id: FlowRouter.getParam('stimulusId') }) },
  number: () => { return parseInt(FlowRouter.getParam('number')) },
  period: () => { return Template.instance().period.get() },
  timestep: () => { return Template.instance().timestep.get() },
  includeIncomplete: () => { return Template.instance().includeIncomplete.get() },
  pointTrailLength: () => { return Template.instance().pointTrailLength.get() },
});

Template.BreadCrumbs.helpers({
  study: () => { return Studies.findOne() },
  analysis: () => { return Analyses.findOne() },
});

Template.Viewings.events({
  'click .update-viewing': () => {
    Session.set('updateViewing', true);
  },


  'click .participant.next': (e, t) => {
    let ids = Participants.find().fetch().map(p => p._id);
    let index = ids.indexOf(FlowRouter.getParam('participantId'));
    if(index == ids.length - 1) {
      index = 0;
    } else {
      index++;
    }

    FlowRouter.setParams({ participantId: ids[index] });
  },
  'click .participant.previous': (e, t) => {
    let ids = Participants.find().fetch().map(p => p._id);
    let index = ids.indexOf(FlowRouter.getParam('participantId'));
    if(index == 0) {
      index = ids.length - 1;
    } else {
      index--;
    }

    FlowRouter.setParams({ participantId: ids[index] });
  },


  'click .stimulus.next': (e, t) => {
    let ids = Stimuli.find().fetch().map(p => p._id);
    let index = ids.indexOf(FlowRouter.getParam('stimulusId'));
    if(index == ids.length - 1) {
      index = 0;
    } else {
      index++;
    }

    FlowRouter.setParams({ stimulusId: ids[index] });
  },
  'click .stimulus.previous': (e, t) => {
    let ids = Stimuli.find().fetch().map(p => p._id);
    let index = ids.indexOf(FlowRouter.getParam('stimulusId'));
    if(index == 0) {
      index = ids.length - 1;
    } else {
      index--;
    }

    FlowRouter.setParams({ stimulusId: ids[index] });
  },


  'click .number.next': () => {
    if(parseInt(FlowRouter.getParam('number')) == Viewings.find({
      participantId: FlowRouter.getParam('participantId'),
      stimulusId: FlowRouter.getParam('stimulusId'),
    }).count()) {
      FlowRouter.setParams({ 'number': 1 });
    } else {
      FlowRouter.setParams({ 'number': parseInt(FlowRouter.getParam('number')) + 1 });
    }
  },
  'click .number.previous': () => {
    if(parseInt(FlowRouter.getParam('number')) == 1) {
      FlowRouter.setParams({ 'number': Viewings.find({
        participantId: FlowRouter.getParam('participantId'),
        stimulusId: FlowRouter.getParam('stimulusId'),
      }).count() });
    } else {
      FlowRouter.setParams({ 'number': parseInt(FlowRouter.getParam('number')) - 1 });
    }
  },

  'change .reactive': (e, t) => {
    let value;
    if(e.target.type == 'checkbox') {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }

    t[e.target.id].set(value);
  },
});

Template.Viewings.destroyed = function(){
  Session.set('updateViewing', false);
}
