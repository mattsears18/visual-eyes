// require('./../../factories.test');
// const { expect } = require('chai');

// if (Meteor.isServer) {
//   describe('Datafiles.makeGazepoints()', () => {
//     it('saves the gazepoint count', async () => {
//       const study = Factory.create('study', { fixationsOnly: false });
//       const datafile = Factory.create('imotionsDatafile', {
//         studyId: study._id,
//       });

//       const points = await datafile.makeGazepoints();
//       const dbDatafile = Datafiles.findOne({ _id: datafile._id });

//       expect(dbDatafile.gazepointCount).to.exist;
//     }).timeout(60000);
//   });
// }
