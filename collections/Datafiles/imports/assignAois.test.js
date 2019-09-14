import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe('Datafiles.assignAois()', () => {
    it("hasn't been assigned stimulusIds yet", () => {
      const datafile = Factory.create('imotionsDatafile');

      const rows = [
        { aoiName: 'some name' },
        { aoiName: 'Spool 1' },
        { aoiName: 'White Space' },
        { aoiName: 'Hazard Scene A' },
        { aoiName: 'foo' },
        { aoiName: 'bar' },
      ];

      expect(() => {
        datafile.assignAois(rows);
      }).to.throw('missingStimulusId');
    });

    it('finds 6 existing Aois for one stimulus', () => {
      const datafile = Factory.create('imotionsDatafile');
      const stimulus = Factory.create('stimulus', {
        studyId: datafile.studyId,
      });

      const existingAoiNames = [
        'some name',
        'Spool 1',
        'White Space',
        'Hazard Scene A',
        'foo',
        'bar',
      ];

      existingAoiNames.forEach((name) => {
        Factory.create('aoi', {
          name,
          studyId: datafile.studyId,
          stimulusId: stimulus._id,
        });
      });

      const initialAoiCount = Aois.find({
        studyId: datafile.studyId,
      }).count();

      expect(initialAoiCount).to.equal(6);

      const rows = [
        { stimulusId: stimulus._id, aoiName: 'some name' },
        { stimulusId: stimulus._id, aoiName: 'Spool 1' },
        { stimulusId: stimulus._id, aoiName: 'White Space' },
        { stimulusId: stimulus._id, aoiName: 'Hazard Scene A' },
        { stimulusId: stimulus._id, aoiName: 'foo' },
        { stimulusId: stimulus._id, aoiName: 'bar' },
      ];

      const assignedRows = datafile.assignAois(rows);

      // each row is assigned an Aoi (aoiId)
      assignedRows.forEach((row) => {
        expect(row.aoiId).to.exist;
      });

      const finalAoiCount = Aois.find({
        studyId: datafile.studyId,
      }).count();

      // doesn't create any new Aois
      expect(finalAoiCount).to.equal(6);
    });

    it('finds existing aois and creates new aois', () => {
      const datafile = Factory.create('imotionsDatafile');

      const stimulus1 = Factory.create('stimulus', {
        studyId: datafile.studyId,
        name: 'some name',
      });
      const stimulus2 = Factory.create('stimulus', {
        studyId: datafile.studyId,
        name: 'Spool 2',
      });

      const initialStimulusCount = Stimuli.find({
        studyId: datafile.studyId,
      }).count();

      expect(initialStimulusCount).to.equal(2);

      const aoi11 = Factory.create('aoi', {
        name: 'aoiname1',
        stimulusId: stimulus1._id,
        studyId: datafile.studyId,
      });

      const aoi12 = Factory.create('aoi', {
        name: 'aoiname2',
        stimulusId: stimulus1._id,
        studyId: datafile.studyId,
      });

      const aoi21 = Factory.create('aoi', {
        name: 'foo',
        stimulusId: stimulus2._id,
        studyId: datafile.studyId,
      });

      const aoi22 = Factory.create('aoi', {
        name: 'bar',
        stimulusId: stimulus2._id,
        studyId: datafile.studyId,
      });

      const initialAoiCount = Aois.find({
        studyId: datafile.studyId,
      }).count();

      expect(initialAoiCount).to.equal(4);

      const rows = [
        { stimulusId: stimulus1._id, aoiName: 'aoiname1' },
        { stimulusId: stimulus1._id, aoiName: 'aoiname2' },
        { stimulusId: stimulus1._id, aoiName: 'White Space' },
        { stimulusId: stimulus2._id, aoiName: 'foo' },
        { stimulusId: stimulus2._id, aoiName: 'bar' },
        { stimulusId: stimulus2._id, aoiName: 'missing' },
      ];

      const assignedRows = datafile.assignAois(rows);
      // each row is assigned an aoi (aoiId)
      assignedRows.forEach((row) => {
        expect(row.aoiId).to.exist;
      });
      const finalAoiCount = Aois.find({
        studyId: datafile.studyId,
      }).count();
      // creates two new aois
      expect(finalAoiCount).to.equal(6);
    });

    it('creates 1 new stimulus and assigns it to many points', () => {
      const datafile = Factory.create('imotionsDatafile');
      const initialStimulusCount = Stimuli.find({
        studyId: datafile.studyId,
      }).count();
      expect(initialStimulusCount).to.equal(0);
      const rows = [
        { stimulusName: 'Spool 1' },
        { stimulusName: 'Spool 1' },
        { stimulusName: 'Spool 1' },
        { stimulusName: 'Spool 1' },
        { stimulusName: 'Spool 1' },
        { stimulusName: 'Spool 1' },
        { stimulusName: 'Spool 1' },
        { stimulusName: 'Spool 1' },
        { stimulusName: 'Spool 1' },
        { stimulusName: 'Spool 1' },
      ];
      const assignedRows = datafile.assignStimuli(rows);
      const newStimulus = Stimuli.findOne({ studyId: datafile.studyId });
      // each row is assigned the same stimulus (stimulusId)
      assignedRows.forEach((row) => {
        expect(row.stimulusId).to.equal(newStimulus._id);
      });
      const finalStimulusCount = Stimuli.find({
        studyId: datafile.studyId,
      }).count();
      // only creates the one new stimulus
      expect(finalStimulusCount).to.equal(1);
    });

    it('adds the datafileId to an existing set of datafileIds', () => {
      const datafile = Factory.create('imotionsDatafile');
      const stimulus = Factory.create('stimulus', {
        studyId: datafile.studyId,
        datafileIds: [datafile._id],
      });
      const aoi = Factory.create('aoi', {
        name: 'foo',
        studyId: datafile.studyId,
        stimulusId: stimulus._id,
        datafileIds: ['existingDatafile1', 'existingDatafile2'],
      });

      const rows = [
        { stimulusId: stimulus._id, aoiName: 'foo' },
        { stimulusId: stimulus._id, aoiName: 'foo' },
        { stimulusId: stimulus._id, aoiName: 'foo' },
        { stimulusId: stimulus._id, aoiName: 'foo' },
        { stimulusId: stimulus._id, aoiName: 'foo' },
        { stimulusId: stimulus._id, aoiName: 'foo' },
      ];

      datafile.assignAois(rows);

      const finalAoi = Aois.findOne({ _id: aoi._id });
      expect(finalAoi.datafileIds).to.eql([
        'existingDatafile1',
        'existingDatafile2',
        datafile._id,
      ]);
    });

    it('does not add any datafileIds', () => {
      const datafile = Factory.create('imotionsDatafile');
      const stimulus = Factory.create('stimulus', {
        studyId: datafile.studyId,
        datafileIds: [datafile._id],
      });
      const aoi = Factory.create('aoi', {
        name: 'foo',
        studyId: datafile.studyId,
        stimulusId: stimulus._id,
      });

      const rows = [
        { stimulusId: stimulus._id, aoiName: 'foo' },
        { stimulusId: stimulus._id, aoiName: 'foo' },
        { stimulusId: stimulus._id, aoiName: 'foo' },
        { stimulusId: stimulus._id, aoiName: 'foo' },
        { stimulusId: stimulus._id, aoiName: 'foo' },
        { stimulusId: stimulus._id, aoiName: 'foo' },
      ];

      datafile.assignAois(rows);

      const finalAoi = Aois.findOne({ _id: aoi._id });
      expect(finalAoi.datafileIds).to.eql([datafile._id]);
    });

    it('has several aois with the same name assigned to different stimuli', () => {
      const datafile = Factory.create('smiDatafile');
      const stimulus1 = Factory.create('stimulus', {
        studyId: datafile.studyId,
        datafileIds: [datafile._id],
        name: 'Spool 1',
      });
      const stimulus2 = Factory.create('stimulus', {
        studyId: datafile.studyId,
        datafileIds: [datafile._id],
        name: 'Spool 2',
      });
      const stimulusBlank = Factory.create('stimulus', {
        studyId: datafile.studyId,
        datafileIds: [datafile._id],
        name: '-',
      });

      const rows = [
        {
          stimulusId: stimulus1._id,
          aoiName: 'some name',
          x: 0,
          y: 0,
        },
        {
          stimulusId: stimulus1._id,
          x: 0,
          y: 0,
          aoiName: 'White Space',
        },
        {
          stimulusId: stimulus1._id,
          x: 0,
          y: 0,
          aoiName: '-',
        },
        {
          stimulusId: stimulus2._id,
          aoiName: 'some name',
          x: 0,
          y: 0,
        },
        {
          stimulusId: stimulus2._id,
          x: 0,
          y: 0,
          aoiName: 'White Space',
        },
        {
          stimulusId: stimulus2._id,
          x: 0,
          y: 0,
          aoiName: '-',
        },
        {
          stimulusId: stimulusBlank._id,
          aoiName: 'some name',
          x: 0,
          y: 0,
        },
        {
          stimulusId: stimulusBlank._id,
          x: 0,
          y: 0,
          aoiName: 'White Space',
        },
        {
          stimulusId: stimulusBlank._id,
          x: 0,
          y: 0,
          aoiName: '-',
        },
      ];

      datafile.assignAois(rows);

      const stimuli = Stimuli.find(
        { studyId: datafile.studyId },
        { sort: { name: 1 } },
      ).fetch();

      const aois = Aois.find(
        { studyId: datafile.studyId },
        { sort: { name: 1 } },
      ).fetch();

      expect(stimuli.length).to.equal(3);
      expect(aois.length).to.equal(9);
    });
  });
}
