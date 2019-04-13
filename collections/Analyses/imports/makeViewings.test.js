require('./../../factories.test');

if(Meteor.isServer) {
  describe('Analyses.makeViewings()', () => {
    it('has no participantId', () => {
      let analysis = Factory.create('analysis');
      chai.expect(analysis.makeViewings({})).to.equal('dasfdgvbf');

      //pick back up here   - need to fix promises
    });

    it('makes 2 viewings', async () => {
      let study = Factory.create('study');
      let datafile = Factory.create('imotionsDatafile', { studyId: study._id });
      let participant = Factory.create('participant', { studyId: study._id });
      let stimulus = Factory.create('stimulus', { studyId: study._id });
      let aoi = Factory.create('aoi', { stimulusId: stimulus._id });
      let analysis = Factory.create('analysis', {
        studyId: study._id,
        participantIds: [ participant._id ],
        stimulusIds: [ stimulus._id ],
        viewingGap: 2000,
        minViewingTime: 5000,
        ignoreOutsideImage: false,
      });

      let points = [
        { timestamp: 0 },                           // start viewing 1
        { timestamp: 1000 },
        { timestamp: 2000, fixationIndex: 1 },
        { timestamp: 3000 },
        { timestamp: 5000, fixationIndex: 2 },      // end viewing 1
        { timestamp: 8000 },                        // exceeded viewingGap - end viewing
        { timestamp: 9000 },                        // next point exceeds viewing gap but minviewingTime not met, so no viewing
        { timestamp: 14000 },                       // start viewing 2
        { timestamp: 15000 },
        { timestamp: 16000 },
        { timestamp: 17000 },
        { timestamp: 18000 },
        { timestamp: 19000 },
        { timestamp: 20000 },
        { timestamp: 21000 },
        { timestamp: 22000 },
        { timestamp: 23000 },                       // end viewing 2
      ];

      points.forEach(point => {
        Factory.create('gazepoint', {
          studyId: study._id,
          datafileId: datafile._id,
          aoiId: aoi._id,
          participantId: participant._id,
          stimulusId: stimulus._id,
          ...point,
        });
      });

      let viewings = await analysis.makeViewings({
        participantId: participant._id,
        stimulusId: stimulus._id,
      });

      chai.expect(viewings.length).to.equal(2);

      chai.expect(viewings[0].startTime).to.equal(0);
      chai.expect(viewings[0].endTime).to.equal(5000);

      chai.expect(viewings[1].startTime).to.equal(14000);
      chai.expect(viewings[1].endTime).to.equal(23000);

    }).timeout(20000);
  });
}
