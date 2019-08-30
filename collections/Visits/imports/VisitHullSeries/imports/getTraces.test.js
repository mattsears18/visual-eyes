import { Factory } from 'meteor/dburles:factory';
import VisitHullSeries from '../VisitHullSeries';
import defaultTestFixations from '../../../defaultTestFixations';

require('../../../../factories.test');
const { expect } = require('chai');

describe('VisitHullSeries.getTraces()', () => {
  it('gets the initial traces', () => {
    const study = Factory.create('study', { fixationsOnly: false });
    const stimulusfile = Factory.create('stimulusfile', { studyId: study._id });
    const stimulus = Factory.create('stimulus', {
      studyId: study._id,
      stimulusfileId: stimulusfile._id,
      width: stimulusfile.fileWidth,
      height: stimulusfile.fileHeight,
    });
    const visit = Factory.create('visit', {
      studyId: study._id,
      stimulusId: stimulus._id,
      fixations: defaultTestFixations,
    });

    const hullseries = new VisitHullSeries({
      visit,
      period: 5000,
    });

    const traces = hullseries.getTraces({ initial: true, hullIndex: 0 });

    expect(traces.data.length).to.equal(6);

    expect(traces.data[0].name).to.equal('Fixations');
    expect(traces.data[0].x).to.eql([100, 200, 300, 400, 500, 600]);
    expect(traces.data[0].y).to.eql([400, 300, 200, 100, 700, 600]);

    expect(traces.data[1].name).to.equal('Last 6 Gaze Points');
    expect(traces.data[1].x).to.eql([100, 200, 300, 400, 500, 600]);
    expect(traces.data[1].y).to.eql([400, 300, 200, 100, 700, 600]);

    expect(traces.data[2].name).to.equal('Centroid Trail');
    expect(traces.data[2].x).to.eql([-10, -11]);
    expect(traces.data[2].y).to.eql([-10, -11]);

    expect(traces.data[3].name).to.equal('Convex Hull');
    expect(traces.data[3].x).to.eql([600, 500, 100, 400, 600]);
    expect(traces.data[3].y).to.eql([600, 700, 400, 100, 600]);

    expect(traces.data[4].name).to.equal('Centroid');
    expect(traces.data[4].x).to.eql([375]);
    expect(traces.data[4].y).to.eql([416 + 2 / 3]);

    expect(traces.data[5].name).to.equal('Last Fixation');
    expect(traces.data[5].x).to.eql([600]);
    expect(traces.data[5].y).to.eql([600]);
  });

  it('gets the traces (not initial)', () => {
    const study = Factory.create('study', { fixationsOnly: false });
    const stimulusfile = Factory.create('stimulusfile', { studyId: study._id });
    const stimulus = Factory.create('stimulus', {
      studyId: study._id,
      stimulusfileId: stimulusfile._id,
      width: stimulusfile.fileWidth,
      height: stimulusfile.fileHeight,
    });
    const visit = Factory.create('visit', {
      studyId: study._id,
      stimulusId: stimulus._id,
      fixations: defaultTestFixations,
    });

    const hullseries = new VisitHullSeries({
      visit,
      period: 5000,
    });

    const traces = hullseries.getTraces({ hullIndex: 7 });
    expect(traces.length).to.equal(6);

    expect(traces[0].x.length).to.equal(6); // pointTrace
    expect(traces[0].y.length).to.equal(6);

    expect(traces[1].x.length).to.equal(10); // pointTrailTrace
    expect(traces[1].y.length).to.equal(10);

    expect(traces[2].x.length).to.equal(8); // centroidTrailTrace
    expect(traces[2].y.length).to.equal(8);

    expect(traces[3].x.length).to.equal(6); // polygonTrace
    expect(traces[3].y.length).to.equal(6);

    expect(traces[4].x.length).to.equal(1); // centroidTrace
    expect(traces[4].y.length).to.equal(1);

    expect(traces[5].x.length).to.equal(1); // lastFixationTrace
    expect(traces[5].y.length).to.equal(1);
  });
});
