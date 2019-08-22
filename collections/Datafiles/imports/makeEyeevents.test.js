require('../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe.only('Datafiles.makeEyeevents()', () => {
    it('makes eyeevents', async () => {
      const study = Factory.create('study');
      const datafile = Factory.create('smiMultiDatafile', {
        studyId: study._id,
      });

      const eyeevents = await datafile.makeEyeevents();
      console.log(`${eyeevents.count()} eyeevents created`);
    }).timeout(60000);

    // it('does not have eye events (no blinks, no saccades, etc. because its an imotions file)', async () => {
    //   const datafile = Factory.create('imotionsDatafile');

    //   const eyeevents = await datafile.makeEyeevents();
    //   console.log(`${eyeevents.count()} eyeevents created`);
    // });
  });
}
