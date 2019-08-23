import { Factory } from 'meteor/dburles:factory';

require('../../factories.test');
const { expect } = require('chai');

if (Meteor.isServer) {
  describe('Datafiles.assignStimuli()', () => {
    it('finds 6 existing stimuli', () => {
      const datafile = Factory.create('imotionsDatafile');

      const existingStimulusNames = [
        'some name',
        'Spool 1',
        'Spool 10',
        'Hazard Scene A',
        'foo',
        'bar',
      ];

      existingStimulusNames.forEach((name) => {
        Factory.create('stimulus', {
          name,
          studyId: datafile.studyId,
        });
      });

      const initialStimulusCount = Stimuli.find({
        studyId: datafile.studyId,
      }).count();

      expect(initialStimulusCount).to.equal(6);

      const rows = [
        { stimulusName: 'some name' },
        { stimulusName: 'Spool 1' },
        { stimulusName: 'Spool 10' },
        { stimulusName: 'Hazard Scene A' },
        { stimulusName: 'foo' },
        { stimulusName: 'bar' },
      ];

      const assignedRows = datafile.assignStimuli(rows);

      // each row is assigned a stimulus (stimulusId)
      assignedRows.forEach((row) => {
        expect(row.stimulusId).to.exist;
      });

      const finalStimulusCount = Stimuli.find({
        studyId: datafile.studyId,
      }).count();

      // doesn't create any new stimuli
      expect(finalStimulusCount).to.equal(6);
    });

    it('finds 3 existing stimuli and creates 3 new stimuli', () => {
      const datafile = Factory.create('imotionsDatafile');

      const existingStimulusNames = ['some name', 'Spool 1', 'Spool 10'];

      existingStimulusNames.forEach((name, i) => {
        Factory.create('stimulus', {
          name,
          studyId: datafile.studyId,
        });
      });

      const initialStimulusCount = Stimuli.find({
        studyId: datafile.studyId,
      }).count();

      expect(initialStimulusCount).to.equal(3);

      const rows = [
        { stimulusName: 'some name' },
        { stimulusName: 'Spool 1' },
        { stimulusName: 'Spool 10' },
        { stimulusName: 'Hazard Scene A' },
        { stimulusName: 'foo' },
        { stimulusName: 'bar' },
      ];

      const assignedRows = datafile.assignStimuli(rows);

      // each row is assigned a stimulus (stimulusId)
      assignedRows.forEach((row) => {
        expect(row.stimulusId).to.exist;
      });

      const finalStimulusCount = Stimuli.find({
        studyId: datafile.studyId,
      }).count();

      // doesn't create any new stimuli
      expect(finalStimulusCount).to.equal(6);
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

    it('adds the datafileId to a new stimulus', () => {
      const datafile = Factory.create('imotionsDatafile');
      const stimulus = Factory.create('stimulus', {
        name: 'foo',
        studyId: datafile.studyId,
      });

      const rows = [
        { stimulusName: 'foo' },
        { stimulusName: 'foo' },
        { stimulusName: 'foo' },
        { stimulusName: 'foo' },
        { stimulusName: 'foo' },
        { stimulusName: 'foo' },
      ];

      datafile.assignStimuli(rows);

      const finalStimulus = Stimuli.findOne({ _id: stimulus._id });
      expect(finalStimulus.datafileIds).to.eql([datafile._id]);
    });

    it('adds the datafileId to an existing set of datafileIds', () => {
      const datafile = Factory.create('imotionsDatafile');
      const stimulus = Factory.create('stimulus', {
        name: 'foo',
        studyId: datafile.studyId,
        datafileIds: ['existingDatafile1', 'existingDatafile2'],
      });

      const rows = [
        { stimulusName: 'foo' },
        { stimulusName: 'foo' },
        { stimulusName: 'foo' },
        { stimulusName: 'foo' },
        { stimulusName: 'foo' },
        { stimulusName: 'foo' },
      ];

      datafile.assignStimuli(rows);

      const finalStimulus = Stimuli.findOne({ _id: stimulus._id });
      expect(finalStimulus.datafileIds).to.eql([
        'existingDatafile1',
        'existingDatafile2',
        datafile._id,
      ]);
    });

    it('does not add any datafileIds', () => {
      const datafile = Factory.create('imotionsDatafile');
      const stimulus = Factory.create('stimulus', {
        name: 'foo',
        studyId: datafile.studyId,
        datafileIds: [datafile._id],
      });

      const rows = [
        { stimulusName: 'foo' },
        { stimulusName: 'foo' },
        { stimulusName: 'foo' },
        { stimulusName: 'foo' },
        { stimulusName: 'foo' },
        { stimulusName: 'foo' },
      ];

      datafile.assignStimuli(rows);

      const finalStimulus = Stimuli.findOne({ _id: stimulus._id });
      expect(finalStimulus.datafileIds).to.eql([datafile._id]);
    });
  });
}
