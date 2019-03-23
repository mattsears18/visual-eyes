Template.AnimationInstantaneousSlide.onCreated(function () {
  // this.hulls = new ReactiveVar([]);
  // this.frames = new ReactiveVar([]);
  // this.frameTimes = new ReactiveVar([]);
  // this.frameIndex = new ReactiveVar(0);
  // this.timeOffset = new ReactiveVar(0);
  // this.currentTime = new ReactiveVar(0);
  // this.playing = new ReactiveVar(false);
});

Template.AnimationInstantaneousSlide.onRendered(function() {
  let self = this;
  viewingId = FlowRouter.getParam('viewingId');

  if(viewingId) {
    if(self.subscriptionsReady()) { initAnimation(self); }
  }
});

Template.AnimationInstantaneousSlide.helpers({
  viewing: () => { return Viewings.findOne(); },
  stimulus: () => { return Stimuli.findOne(); },

  hulls: () => { return Template.instance().hulls.get(); },

  currentHull: () => {
    if(Template.instance().hulls.get().length) {
      return Template.instance().hulls.get()[Template.instance().frameIndex.get()]
    }
  },
});

function initAnimation(template) {
  Plotly.purge('AnimationInstantaneousSlide');

  let viewing = Viewings.findOne();
  if(viewing) {
  

    template.frames.set(frames);
    template.frameTimes.set(frameTimes);

    let stimulus = viewing.stimulus();
    let stimulusfile = stimulus.stimulusfile();

    // force width
    let forceWidth = 600;
    let scale = forceWidth / stimulusfile.fileWidth;



    // Create the plot:
    Plotly.react('AnimationInstantaneousSlide', {
      data: traces,
      layout: layout,
    });
  }
}

function playAnimation(timestamp, template) {
  if(template.timeOffset.get() == 0) {
    template.timeOffset.set(template.hulls.get()[0].endTime() - timestamp);
  }

  template.currentTime.set(timestamp + template.timeOffset.get());
  console.log('currentTime: ' + template.currentTime.get());

  if(template.currentTime.get() > template.frameTimes.get()[template.frameIndex.get() + 1]) {
    console.log('display frame ' + template.frameIndex.get() + ': with timestamp = ' + template.frameTimes.get()[template.frameIndex.get()]);
    Plotly.animate('AnimationInstantaneousSlide', {
      data: template.frames.get()[template.frameIndex.get()].data
    }, {
      transition: {
        duration: 0
      },
      frame: {
        duration: 0,
        redraw: false
      }
    });
  }

  while(template.frameTimes.get()[template.frameIndex.get()] < template.currentTime.get()) {
    template.frameIndex.set(template.frameIndex.get() + 1);
  }

  if(template.frameIndex.get() < template.frames.get().length) {
    window.requestAnimationFrame(function(timestamp) {
      playAnimation(timestamp, template);
    });
  }
}

Template.AnimationInstantaneousSlide.events({
  'click .play-animation': (e, template) => {
    template.playing.set(true);
    template.frameIndex.set(0);
    template.timeOffset.set(0);
    window.requestAnimationFrame(function(timestamp) {
      playAnimation(timestamp, template);
    });
  },
  'click .pause-animation': (e, template) => {
    template.playing.set(false);
  },
});
