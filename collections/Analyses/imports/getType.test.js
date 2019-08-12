import '../../factories.test';
import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';
import Analyses from '../Analyses';

describe('Analyses.getType()', () => {
  it('has no type', async () => {
    const analysis = Factory.create('analysis');
    expect(analysis.getType()).to.equal('custom');
  });

  it('has a type ', async () => {
    const analysis = Factory.create('analysis', { type: 'iso15007' });
    expect(analysis.getType()).to.equal('iso15007');
  });

  it('saves the type', async () => {
    const analysis = Factory.create('analysis');

    // remove the type
    analysis.type = null;

    // it saves the type as the default ('custom')
    const savedAnalysis = Analyses.findOne({ _id: analysis._id });
    expect(savedAnalysis.type).to.equal('custom');
  });
});
