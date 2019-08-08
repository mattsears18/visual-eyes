import '../../factories.test';

import { Factory } from 'meteor/dburles:factory';
import { expect } from 'chai';

describe('Study.makeDefaultAnalysesThatDontExist()', () => {
  it('makes 88 analyses, even though it has no participants or stimuli', () => {
    const study = Factory.create('study');
    study.makeDefaultAnalysesThatDontExist();

    expect(study.analyses().count()).to.eql(128);
  });
});
