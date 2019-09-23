import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

describe('Stimuli.setFixationsOnStimulus()', () => {
  it('sets whether the fixations are on the stimulus', () => {
    const study = Factory.create('study');
    const stimulus = Factory.create('stimulus', {
      studyId: study._id,
      width: 1000,
      height: 1000,
    });
    const blankStimulus = Factory.create('stimulus', {
      name: '-',
      studyId: study._id,
    });
    const blankAoi = Factory.create('aoi', {
      name: '-',
      studyId: study._id,
      stimulusId: blankStimulus._id,
    });

    const rows = [
      {
        timestamp: 0,
        xs: [0, 1, 2, 3], // all on stimulus
        ys: [0, 1, 2, 3], // all on stimulus
      },
      {
        timestamp: 100,
        xs: [-1, 0, 1], // one off stimulus
        ys: [1, 2, 3],
      },
      {
        timestamp: 200,
        xs: [1, 1],
        ys: [1, 1001], // one off stimulus
      },
      {
        timestamp: 300,
        xs: [1000, 1000], // all on stimulus
        ys: [1000, 1000], // all on stimulus
      },
    ];

    for (let i = 0; i < rows.length; i += 1) {
      Factory.create('fixation', {
        studyId: stimulus.studyId,
        stimulusId: stimulus._id,
        ...rows[i],
      });
    }

    stimulus.setFixationsOnStimulus();

    const fixations = Eyeevents.find(
      {
        type: 'Fixation',
        studyId: study._id,
      },
      { sort: { timestamp: 1 } },
    ).fetch();

    expect(fixations[0].onStimulus).to.equal(true);
    expect(fixations[0].stimulusId).to.equal(stimulus._id);

    expect(fixations[1].onStimulus).to.equal(false);
    expect(fixations[1].stimulusId).to.equal(blankStimulus._id);
    expect(fixations[1].aoiId).to.equal(blankAoi._id);

    expect(fixations[2].onStimulus).to.equal(false);
    expect(fixations[2].stimulusId).to.equal(blankStimulus._id);
    expect(fixations[2].aoiId).to.equal(blankAoi._id);

    expect(fixations[3].onStimulus).to.equal(true);
    expect(fixations[3].stimulusId).to.equal(stimulus._id);
  }).timeout(10000);
});
