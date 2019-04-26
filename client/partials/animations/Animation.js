Template.Animation.onCreated(function() {
  this.playing = new ReactiveVar(false)
  this.frameIndex = new ReactiveVar(0)
  this.timeOffset = new ReactiveVar(0)
  this.currentTime = new ReactiveVar(0)
  this.frames = new ReactiveVar(Template.currentData().frames);
})

Template.Animation.onRendered(function() {
  this.autorun(() => {
    if(Template.currentData().initialTraces && Template.currentData().layout) {
      initAnimation.bind(this)({
        initialTraces: Template.currentData().initialTraces,
        layout: Template.currentData().layout,
      })
    }
  })
})

function initAnimation({
  initialTraces,
  layout,
}) {
  if(initialTraces && layout) {
    Plotly.purge('PlotArea');

    Plotly.react('PlotArea', {
      data: initialTraces.data,
      layout: layout,
    });
    this.currentTime.set(initialTraces.name)
    this.playing.set(false);
    this.timeOffset.set(0);
    this.frameIndex.set(0);
    this.currentTime.set(this.frames.get()[0].name);
  }
}

Template.Animation.helpers({
  stimulus: () => {     return Stimuli.findOne() },
  frameIndex: () => {   return Template.instance().frameIndex.get() },
  frameName:() => {     return Template.instance().frameIndex.get() + 1 },
  frameCount: () => {   return (Template.currentData().frames ? Template.currentData().frames.length : 0) },
  timeOffset: () => {   return Template.instance().timeOffset.get() },
  currentTime: () => {  return Template.instance().currentTime.get() },
  playing: () => {      return Template.instance().playing.get() },
  startTime: () => {    return Template.instance().frames.get()[0].name },
  endTime: () => {      return Template.instance().frames.get()[Template.instance().frames.get().length - 1].name },
  progressPercent: () => {
    let startTime = Template.instance().frames.get()[0].name
    let endTime = Template.instance().frames.get()[Template.instance().frames.get().length - 1].name
    return Math.round(Math.min((Template.instance().currentTime.get() - startTime) / (endTime - startTime) * 100, 100))
  },
  progressSliderWidth: () => {
    return (Template.currentData().layout ? Template.currentData().layout.width - 206 : undefined)
  },
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
    let index = Math.max(template.frameIndex.get() - 1, 0);
    template.playing.set(false);
    template.timeOffset.set(0);
    template.frameIndex.set(index);
    template.currentTime.set(template.frames.get()[index].name);
    plotFrame.bind(template)(index);
  },
  'click .beginning-animation': (e, template) => {
    let index = 0;
    template.playing.set(false);
    template.timeOffset.set(0);
    template.frameIndex.set(index);
    template.currentTime.set(template.frames.get()[index].name);
    plotFrame.bind(template)(index);
  },
  'click .step-forward-animation': (e, template) => {
    let index = Math.min(template.frameIndex.get() + 1, template.frames.get().length - 1);
    template.playing.set(false);
    template.timeOffset.set(0);
    template.frameIndex.set(index);
    template.currentTime.set(template.frames.get()[index].name);
    plotFrame.bind(template)(index);
  },
  'click .end-animation': (e, template) => {
    let index = template.frames.get().length - 1;
    template.playing.set(false);
    template.timeOffset.set(0);
    template.frameIndex.set(index);
    template.currentTime.set(template.frames.get()[index].name);
    plotFrame.bind(template)(index);
  },
  'input .slider-animation': (e, template) => {
    let index = Math.max(parseInt(template.frames.get().length * e.target.value / 100) - 1, 0);
    template.playing.set(false);
    template.timeOffset.set(0);
    template.frameIndex.set(index);
    template.currentTime.set(template.frames.get()[index].name);
    plotFrame.bind(template)(index);
  },
});

function playAnimation(timestamp) {
  if(this.playing.get()) {
    if(this.frameIndex.get() == this.frames.get().length - 1) {
      // reached the end, start over
      this.frameIndex.set(0);
      plotFrame.bind(this)(0);
    }
  }

  if(this.timeOffset.get() == 0) {
    this.timeOffset.set(this.frames.get()[this.frameIndex.get()].name - timestamp);
  }

  this.currentTime.set(timestamp + this.timeOffset.get());
  // console.log('currentTime: ' + this.currentTime.get());

  if(this.currentTime.get() > this.frames.get()[this.frameIndex.get() + 1].name) {
    while(this.frames.get()[this.frameIndex.get() + 1].name < this.currentTime.get()) {
      this.frameIndex.set(this.frameIndex.get() + 1);
    }
    // console.log('display frame ' + this.frameIndex.get() + ': with timestamp = ' + this.frames.get()[this.frameIndex.get()].name);
    plotFrame.bind(this)();
  }

  if(this.playing.get()) {
    if(this.frameIndex.get() < this.data.frames.length - 1) {
      window.requestAnimationFrame(playAnimation.bind(this));
    } else {
      this.playing.set(false);
      this.currentTime.set(this.frames.get()[this.frames.get().length - 1].name);
      this.timeOffset.set(0);
      this.frameIndex.set(this.data.frames.length - 1);
    }
  }
}

function plotFrame(index) {
  if(typeof(index) == 'undefined') { index = this.frameIndex.get() }

  let frame = this.frames.get()[this.frameIndex.get()]
  let data = (frame.data ? frame.data : frame.getData())

  if(data) {
    // console.log(data);
    Plotly.animate('PlotArea', {
      data: data
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
}
