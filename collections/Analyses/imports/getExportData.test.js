import '../../factories.test';
import { expect } from 'chai';
import { Factory } from 'meteor/dburles:factory';

describe('Analyses.getExportData()', () => {
  it('has no participants', () => {
    const analysis = Factory.create('analysis');
    expect(analysis.getExportData()).to.eql([]);
  });

  it.only('has a participant', () => {
    const participant = Factory.create('participant');
    const analysis = Factory.create('analysis', {
      participantIds: [participant._id],
    });

    expect(analysis.getExportData().length).to.equal(1);
  });
});
