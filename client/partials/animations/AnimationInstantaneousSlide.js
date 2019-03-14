Template.AnimationInstantaneousSlide.onCreated(function() {
  var self = this;

  self.autorun(function() {
    viewingId = FlowRouter.getParam('viewingId');
    Session.get('fixationTrailLength');

    if(viewingId) {
      self.subscribe('viewings.single', viewingId);
      self.subscribe('stimuli.byViewingId', viewingId);
      self.subscribe('stimulusfiles.byViewingId', viewingId);

      if(self.subscriptionsReady()) { makeInstantaneousSlidePlot(viewingId); }
    }
  });
});

Template.AnimationInstantaneousSlide.helpers({
  viewing: () => { return Viewings.findOne(); },
  stimulus: () => { return Stimuli.findOne(); },
});

function makeInstantaneousSlidePlot(viewingId) {
  Plotly.purge('AnimationInstantaneousSlide');

  viewing = Viewings.findOne();

  Meteor.call('viewings.getSlideHulls', { viewingId: viewingId }, function (err, hulls) {
    if(err) {
      console.log(err);
    } else {
      // Set initial traces
      pointsTrace = {
        name: 'Fixations',
        x: hulls[0].pointsX,
        y: hulls[0].pointsY,
        text: hulls[0].pointsTimeText,
        mode: 'markers',
        type: 'scatter',
        marker: {
          color: '#337ab7',
          size: 8,
        },
      };

      polygonTrace = {
        name: 'Convex Hull',
        x: hulls[0].polygonX,
        y: hulls[0].polygonY,
        mode: 'lines',
        type: 'scatter',
        line: {
          color: '#000000',
          width: 2.5,
        },
      };

      centroidTrace = {
        name: 'Centroid',
        x: [hulls[0].centroid.x],
        y: [hulls[0].centroid.y],
        mode: 'markers',
        type: 'scatter',
        marker: {
          color: 'FFFFFF',
          size: 8,
          line: {
            color: '#dc3545',
            width: 3
          },
        },
      };

      centroidHistoryTrace = {
        name: 'Centroid History',
        x: [0],
        y: [0],
        mode: 'lines',
        type: 'scatter',
        line: {
          color: '#dc3545',
          width: 2.5,
        },
      };

      lastFixationTrace = {
        name: 'Last Fixation',
        x: [hulls[0].pointsXY[(hulls[0].pointsXY.length - 1)].x],
        y: [hulls[0].pointsXY[(hulls[0].pointsXY.length - 1)].y],
        mode: 'markers',
        type: 'scatter',
        marker: {
          color: '#FFFFFF',
          size: 15,
          line: {
            color: '#63a70a',
            width: 4
          },
        },
      };

      lastFixationPastTrace = {
        name: 'Last ' + Session.get('fixationTrailLength') + ' Fixations',
        x: getLastFixationHistoryX(hulls[0]),
        y: getLastFixationHistoryY(hulls[0]),
        mode: 'lines',
        type: 'scatter',
        line: {
          color: '#63a70a',
          width: 2.5,
        },
      };

      traces = [
        centroidHistoryTrace,
        centroidTrace,
        pointsTrace,
        polygonTrace,
        lastFixationPastTrace,
        lastFixationTrace,
      ];

      // Make a frame for each hull
      var frames = [];
      hulls.forEach(function(hull) {
        points = {
          x: hull.pointsX,
          y: hull.pointsY,
          text: hull.pointsTimeText,
        };

        polygon = {
          x: hull.polygonX,
          y: hull.polygonY,
        }

        centroid = {
          x: [hull.centroid.x],
          y: [hull.centroid.y],
        }

        centroidHistory = {
          x: hull.centroidHistoryX,
          y: hull.centroidHistoryY,
        }

        lastFixation = {
          x: [hull.pointsXY[(hull.pointsXY.length - 1)].x],
          y: [hull.pointsXY[(hull.pointsXY.length - 1)].y],
        }

        lastFixationPast = {
          x: getLastFixationHistoryX(hull),
          y: getLastFixationHistoryY(hull),
        }

        frames.push({
          name: hull.startTime,
          data: [
            centroidHistory,
            centroid,
            points,
            polygon,
            lastFixationPast,
            lastFixation,
          ],
        });
      });

      // Now create slider steps, one for each frame. The slider
      // executes a plotly.js API command (here, Plotly.animate).
      // In this example, we'll animate to one of the named frames
      // created in the above loop.
      var sliderSteps = [];
      hulls.forEach(function(hull) {
        sliderSteps.push({
          method: 'animate',
          label: hull.startTime,
          args: [[hull.startTime], {
            mode: 'immediate',
            transition: {duration: hull.timeStep},
            frame: { duration: hull.timeStep, redraw: false },
          }]
        });
      });

      // console.log(sliderSteps);

      stimulus = viewing.stimulus();
      stimulusfile = viewing.stimulus().stimulusfile();

      // force width
      forceWidth = 800;
      scale = forceWidth / stimulusfile.fileWidth;

      layout = {
        xaxis: {
          rangemode: 'tozero',
          range: [0, stimulus.width],
          autorange: false,
        },
        yaxis: {
          rangemode: 'tozero',
          range: [0, stimulus.height],
          autorange: false,
        },
        width: forceWidth,
        height: stimulusfile.fileHeight * scale,
        margin: {
          l: 50,
          r: 10,
          b: 0,
          t: 0,
          pad: 4
        },
        images: [{
          source: Stimulusfiles.link(stimulusfile),
          xref: 'paper',
          yref: 'paper',
          x: 0,
          y: 0,
          sizex: 1,
          sizey: 1,
          sizing: 'stretch',
          xanchor: 'left',
          yanchor: 'bottom',
          layer: 'below',
        }],
        hovermode: 'closest',
       // We'll use updatemenus (whose functionality includes menus as
       // well as buttons) to create a play button and a pause button.
       // The play button works by passing `null`, which indicates that
       // Plotly should animate all frames. The pause button works by
       // passing `[null]`, which indicates we'd like to interrupt any
       // currently running animations with a new list of frames. Here
       // The new list of frames is empty, so it halts the animation.
        updatemenus: [{
          x: 0,
          y: 0,
          yanchor: 'top',
          xanchor: 'left',
          showactive: false,
          direction: 'left',
          type: 'buttons',
          pad: {t: 87, r: 10},
          buttons: [{
            method: 'animate',
            args: [null, {
              mode: 'immediate',
              fromcurrent: true,
              transition: { duration: 0 },
              // frame: {duration: 300, redraw: false}
            }],
            label: 'Play'
          }, {
            method: 'animate',
            args: [[null], {
              mode: 'immediate',
              transition: {duration: 0},
              // frame: {duration: 500, redraw: false}
            }],
            label: 'Pause'
          }]
        }],
       // Finally, add the slider and use `pad` to position it
       // nicely next to the buttons.
        sliders: [{
          pad: { l: 130, t: 50, b: 10, r: 20 },
          currentvalue: {
            visible: true,
            prefix: 'Start Time:',
            xanchor: 'right',
            font: {size: 20, color: '#666'}
          },
          steps: sliderSteps
        }]
      };

      // Create the plot:
      Plotly.react('AnimationInstantaneousSlide', {
        data: traces,
        layout: layout,
        frames: frames,
      });
    }
  });
}


function getLastFixationHistoryX(hull) {
  return hull.pointsX.slice(Math.max(0, hull.pointsX.length - Session.get('fixationTrailLength')));
}

function getLastFixationHistoryY(hull) {
  return hull.pointsY.slice(Math.max(0, hull.pointsY.length - Session.get('fixationTrailLength')));
}
