Template.Animation.onCreated(function() {
  this.playing = new ReactiveVar(false);
  this.frameTimes = new ReactiveVar([]);
  this.frameIndex = new ReactiveVar(0);
  this.timeOffset = new ReactiveVar(0);
  this.currentTime = new ReactiveVar(0);
});

Template.Animation.helpers({
  stimulus: () => {     return Stimuli.findOne(); },
  frameTimes: () => {   return Template.instance().frameTimes.get(); },
  frameIndex: () => {   return Template.instance().frameIndex.get(); },
  frameName:() => {     return Template.instance().frameIndex.get() + 1; },
  frameCount: () => {   return (Template.currentData().frames ? Template.currentData().frames.length : 0) },
  timeOffset: () => {   return Template.instance().timeOffset.get(); },
  currentTime: () => {  return Template.instance().currentTime.get(); },
  playing: () => {      return Template.instance().playing.get(); },
  startTime: () => {    return Template.instance().frameTimes.get()[0]; },
  endTime: () => {      return Template.instance().frameTimes.get()[Template.instance().frameTimes.get().length - 1]; },
  progressPercent: () => {
    let startTime = Template.instance().frameTimes.get()[0];
    let endTime = Template.instance().frameTimes.get()[Template.instance().frameTimes.get().length - 1];
    return Math.round(Math.min((Template.instance().currentTime.get() - startTime) / (endTime - startTime) * 100, 100));
  },
  progressSliderWidth: () => {
    return (Template.currentData().layout ? Template.currentData().layout.width - 206 : undefined)
  },
});

Template.Animation.onRendered(function() {
  initAnimation.bind(this)();
});

function initAnimation() {
  console.log(this);
  Plotly.purge('PlotArea');

  Plotly.react('PlotArea', {
    data: this.data.initialTraces,
    layout: this.data.layout,
  });

  this.frameTimes.set(this.data.frames.map(frame => parseInt(frame.name)));
  this.currentTime.set(this.frameTimes.get()[0]);
}

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
    template.currentTime.set(template.frameTimes.get()[index]);
    plotFrame.bind(template)(index);
  },
  'click .beginning-animation': (e, template) => {
    let index = 0;
    template.playing.set(false);
    template.timeOffset.set(0);
    template.frameIndex.set(index);
    template.currentTime.set(template.frameTimes.get()[index]);
    plotFrame.bind(template)(index);
  },
  'click .step-forward-animation': (e, template) => {
    let index = Math.min(template.frameIndex.get() + 1, template.frameTimes.get().length - 1);
    template.playing.set(false);
    template.timeOffset.set(0);
    template.frameIndex.set(index);
    template.currentTime.set(template.frameTimes.get()[index]);
    plotFrame.bind(template)(index);
  },
  'click .end-animation': (e, template) => {
    let index = template.frameTimes.get().length - 1;
    template.playing.set(false);
    template.timeOffset.set(0);
    template.frameIndex.set(index);
    template.currentTime.set(template.frameTimes.get()[index]);
    plotFrame.bind(template)(index);
  },
  'input .slider-animation': (e, template) => {
    let index = Math.max(parseInt(template.frameTimes.get().length * e.target.value / 100) - 1, 0);
    template.playing.set(false);
    template.timeOffset.set(0);
    template.frameIndex.set(index);
    template.currentTime.set(template.frameTimes.get()[index]);
    plotFrame.bind(template)(index);
  },
});

function playAnimation(timestamp) {
  if(this.playing.get()) {
    if(this.frameIndex.get() == this.frameTimes.get().length - 1) {
      // reached the end, start over
      this.frameIndex.set(0);
      plotFrame.bind(this)(0);
    }
  }

  if(this.timeOffset.get() == 0) {
    this.timeOffset.set(this.frameTimes.get()[this.frameIndex.get()] - timestamp);
  }

  this.currentTime.set(timestamp + this.timeOffset.get());
  // console.log('currentTime: ' + this.currentTime.get());

  if(this.currentTime.get() > this.frameTimes.get()[this.frameIndex.get() + 1]) {
    while(this.frameTimes.get()[this.frameIndex.get() + 1] < this.currentTime.get()) {
      this.frameIndex.set(this.frameIndex.get() + 1);
    }
    // console.log('display frame ' + this.frameIndex.get() + ': with timestamp = ' + this.frameTimes.get()[this.frameIndex.get()]);
    plotFrame.bind(this)();
  }

  if(this.playing.get()) {
    if(this.frameIndex.get() < this.data.frames.length - 1) {
      window.requestAnimationFrame(playAnimation.bind(this));
    } else {
      this.playing.set(false);
      this.currentTime.set(this.frameTimes.get()[this.frameTimes.get().length - 1]);
      this.timeOffset.set(0);
      this.frameIndex.set(this.data.frames.length - 1);
    }
  }
}

function plotFrame(index) {
  if(typeof(index) == 'undefined') { index = this.frameIndex.get() }

  Plotly.animate('PlotArea', {
    data: this.data.frames[index].data
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
