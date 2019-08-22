require('../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe('Datafiles.makeEyeevents()', () => {
    it('makes eyeevents', async () => {
      const datafile = Factory.create('smiMultiDatafile');

      const eyeevents = await datafile.makeEyeevents();
      console.log(`${eyeevents.count()} eyeevents created`);
    });

    // it('does not have eye events (no blinks, no saccades, etc. because its an imotions file)', async () => {
    //   const datafile = Factory.create('imotionsDatafile');

    //   const eyeevents = await datafile.makeEyeevents();
    //   console.log(`${eyeevents.count()} eyeevents created`);
    // });
  });
}
