Template.Animation.onCreated(function() {
  this.playing = new ReactiveVar(false);
  this.frameIndex = new ReactiveVar(0);
  this.timeOffset = new ReactiveVar(0);
  this.currentTime = new ReactiveVar(0);
  this.frameSeries = new ReactiveVar(Template.currentData().frameSeries);
  this.frames = new ReactiveVar(this.frameSeries.get().getFrames());
});

Template.Animation.onRendered(function() {
  this.autorun(() => {
    if (Template.currentData().initialTraces && Template.currentData().layout && Template.currentData().frameSeries) {
      this.frameSeries.set(Template.currentData().frameSeries);
      this.frames.set(this.frameSeries.get().getFrames());

      initAnimation.bind(this)({
        initialTraces: Template.currentData().initialTraces,
        layout: Template.currentData().layout,
      });
    }
  });
});

function initAnimation({
  initialTraces,
  layout,
}) {
  if (initialTraces && layout) {
    Plotly.purge('PlotArea');

    Plotly.react('PlotArea', {
      data: initialTraces.data,
      layout,
    });

    this.currentTime.set(initialTraces.name);
    this.playing.set(false);
    this.timeOffset.set(0);
    this.frameIndex.set(0);
    this.currentTime.set(this.frames.get()[0].name);
  }
}

Template.Animation.helpers({
  stimulus: () => Stimuli.findOne(),
  frameIndex: () => Template.instance().frameIndex.get(),
  frameName: () => Template.instance().frameIndex.get() + 1,
  frameCount: () => (Template.instance().frames.get() ? Template.instance().frames.get().length : 0),
  timeOffset: () => Template.instance().timeOffset.get(),
  currentTime: () => Template.instance().currentTime.get(),
  playing: () => Template.instance().playing.get(),
  startTime: () => Template.instance().frames.get()[0].name,
  endTime: () => Template.instance().frames.get()[Template.instance().frames.get().length - 1].name,
  progressPercent: () => {
    const startTime = Template.instance().frames.get()[0].name;
    const endTime = Template.instance().frames.get()[Template.instance().frames.get().length - 1].name;
    return Math.round(Math.min((Template.instance().currentTime.get() - startTime) / (endTime - startTime) * 100, 100));
  },
  progressSliderWidth: () => (Template.currentData().layout ? Template.currentData().layout.width - 206 : undefined),
  currentFrame: () => Template.instance().frames.get()[Template.instance().frameIndex.get()],
  coverage: () => helpers.formatNumber(Template.instance().frames.get()[Template.instance().frameIndex.get()].coverage() * 100),
});

Template.Animation.events({
  'click .play-animation': (e, template) => {
    template.playing.set(true);
    template.timeOffset.set(0);
    window.requestAnimationFrame(playAnimation.bind(template));
  },
  'click .pause-animation': (e, template) => {
    template.playing.set(false);
    template.timeOffset.set(0);
  },
  'click .step-backward-animation': (e, template) => {
    const index = Math.max(template.frameIndex.get() - 1, 0);
    template.playing.set(false);
    template.timeOffset.set(0);
    template.frameIndex.set(index);
    template.currentTime.set(template.frames.get()[index].name);
    plotFrame.bind(template)(index);
  },
  'click .beginning-animation': (e, template) => {
    const index = 0;
    template.playing.set(false);
    template.timeOffset.set(0);
    template.frameIndex.set(index);
    template.currentTime.set(template.frames.get()[index].name);
    plotFrame.bind(template)(index);
  },
  'click .step-forward-animation': (e, template) => {
    const index = Math.min(template.frameIndex.get() + 1, template.frames.get().length - 1);
    template.playing.set(false);
    template.timeOffset.set(0);
    template.frameIndex.set(index);
    template.currentTime.set(template.frames.get()[index].name);
    plotFrame.bind(template)(index);
  },
  'click .end-animation': (e, template) => {
    const index = template.frames.get().length - 1;
    template.playing.set(false);
    template.timeOffset.set(0);
    template.frameIndex.set(index);
    template.currentTime.set(template.frames.get()[index].name);
    plotFrame.bind(template)(index);
  },
  'input .slider-animation': (e, template) => {
    const index = Math.max(parseInt(template.frames.get().length * e.target.value / 100) - 1, 0);
    template.playing.set(false);
    template.timeOffset.set(0);
    template.frameIndex.set(index);
    template.currentTime.set(template.frames.get()[index].name);
    plotFrame.bind(template)(index);
  },
});

function playAnimation(timestamp) {
  if (this.playing.get()) {
    if (this.frameIndex.get() == this.frames.get().length - 1) {
      // reached the end, start over
      this.frameIndex.set(0);
      plotFrame.bind(this)(0);
    }
  }

  if (this.timeOffset.get() == 0) {
    this.timeOffset.set(this.frames.get()[this.frameIndex.get()].name - timestamp);
  }

  this.currentTime.set(timestamp + this.timeOffset.get());

  if (this.currentTime.get() > this.frames.get()[this.frameIndex.get() + 1].name) {
    while (this.frames.get()[this.frameIndex.get() + 1].name < this.currentTime.get()) {
      this.frameIndex.set(this.frameIndex.get() + 1);
    }
    plotFrame.bind(this)();
  }

  if (this.playing.get()) {
    if (this.frameIndex.get() < this.frames.get().length - 1) {
      window.requestAnimationFrame(playAnimation.bind(this));
    } else {
      this.playing.set(false);
      this.currentTime.set(this.frames.get()[this.frames.get().length - 1].name);
      this.timeOffset.set(0);
      this.frameIndex.set(this.frames.get().length - 1);
    }
  }
}

function plotFrame(index) {
  if (typeof (index) === 'undefined') { index = this.frameIndex.get(); }
  const frame = this.frames.get()[index];

  let data;
  if (frame.data) {
    data = frame.data;
  } else if (frame.getData) {
    data = frame.getData();
  } else if (this.frameSeries.get().getFrameData) {
    data = this.frameSeries.get().getFrameData({ index });
  }

  if (data) {
    Plotly.animate('PlotArea', {
      data,
    }, {
      transition: {
        duration: 0,
      },
      frame: {
        duration: 0,
        redraw: false,
      },
    });
  }
}
