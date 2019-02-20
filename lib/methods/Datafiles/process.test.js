import { resetDatabase } from 'meteor/xolvio:cleaner';
import Schemas from '../../schemas';
import Studies from '../../../collections/Studies/Studies';
import Aois from '../../../collections/Aois/Aois';
import Stimuli from '../../../collections/Stimuli/Stimuli';
import {  detectFormat,
          renameHeaders,
          getNumericPositiveCoordinatesOnly,
          getStimuliOnly,
          getVisualIntakesOnly,
          getFixationsOnly,
          getStimulusId,
          getAoiId
       } from './process';

import shortSMITestData from        '../../../testFiles/shortFile/shortSMITestData.json';
import shortImotionsTestData from   '../../../testFiles/shortFile/shortImotionsTestData.json';
import mediumSMITestData from       '../../../testFiles/mediumFile/mediumSMITestData.json';

import realImotionsTestData from    '../../../testFiles/realFile/imotionsWael.json';
import realSMITestData from         '../../../testFiles/realFile/smiWael.json';


var faker = require('faker');

describe('Datafiles', function() {
  describe('.process() METEOR METHOD', function() {
    describe('Pre-process SMI', function() {
      describe('can read real SMI test Datafile', function() {
        it('has 12,742 lines', function() {
          chai.expect(realSMITestData.length).to.equal(12742);
        });
      });

      describe('detectFormat()', function() {
        smiFormat = detectFormat(realSMITestData);
        it('detects the SMI file format', function() {
          expect(smiFormat).to.equal('smi');
        });
      });

      smiRenamed = renameHeaders(realSMITestData, 'smi');

      describe('renameHeaders()', function() {
        it('renames SMI BeGaze default headings to correct headings', function() {
          expect(smiRenamed[0].hasOwnProperty('recordingTime')).to.be.true;
          expect(smiRenamed[0].hasOwnProperty('timeOfDay')).to.be.true;
          expect(smiRenamed[0].hasOwnProperty('category')).to.be.true;
          expect(smiRenamed[0].hasOwnProperty('fixationIndex')).to.be.true;
          expect(smiRenamed[0].hasOwnProperty('x')).to.be.true;
          expect(smiRenamed[0].hasOwnProperty('y')).to.be.true;
          expect(smiRenamed[0].hasOwnProperty('aoiName')).to.be.true;
        });
      });

      smiVisualIntakes = getVisualIntakesOnly(smiRenamed);

      describe('getVisualIntakesOnly()', function() {
        it('real SMI test datafile has 9,484 visual intakes (gaze points)', function() {
          expect(smiVisualIntakes.length).to.equal(9484);
        });
      });

      smiStimuli = getStimuliOnly(smiVisualIntakes);

      describe('getStimuliOnly()', function() {
        it('real SMI test datafile has 4,239 gaze points associated with a stimulus', function() {
          expect(smiStimuli.length).to.equal(4239);
        });
      });

      smiNumeric = getNumericPositiveCoordinatesOnly(smiStimuli);

      describe('getNumericPositiveCoordinatesOnly()', function() {
        it('real SMI test datafile has 2,948 numeric positive gaze points', function() {
          expect(smiNumeric.length).to.equal(2948);
        });
      });

      smiFixations = getFixationsOnly(smiNumeric);

      describe('getFixationsOnly()', function() {
        it('real SMI test datafile has 205 fixations', function() {
          expect(smiFixations.length).to.equal(205);
        });
      });
    });







    describe('Pre-process iMotions', function() {
      describe('can read real iMotions test Datafile', function() {
        it('has 12,271 lines', function() {
          chai.expect(realImotionsTestData.length).to.equal(12271);
        });
      });

      describe('detectFormat()', function() {
        imotionsFormat = detectFormat(realImotionsTestData);
        it('detects the iMotions file format', function() {
          expect(imotionsFormat).to.equal('imotions');
        });
      });

      imotionsRenamed = renameHeaders(realImotionsTestData, 'imotions');

      describe('renameHeaders()', function() {
        it('renames iMotions default headings to correct headings', function() {
          expect(imotionsRenamed[0].hasOwnProperty('recordingTime')).to.be.true;
          expect(imotionsRenamed[0].hasOwnProperty('fixationIndex')).to.be.true;
          expect(imotionsRenamed[0].hasOwnProperty('x')).to.be.true;
          expect(imotionsRenamed[0].hasOwnProperty('y')).to.be.true;
          expect(imotionsRenamed[0].hasOwnProperty('stimulusName')).to.be.true;
          expect(imotionsRenamed[0].hasOwnProperty('aoiName')).to.be.true;
        });
      });

      imotionsVisualIntakes = getVisualIntakesOnly(imotionsRenamed);

      describe('getVisualIntakesOnly()', function() {
        it('real iMotions test datafile has 12,271 visual intakes (gaze points). Note: iMotions does not use this.' , function() {
          expect(imotionsVisualIntakes.length).to.equal(12271);
        });
      });

      imotionsStimuli = getStimuliOnly(imotionsVisualIntakes);

      describe('getStimuliOnly()', function() {
        it('real SMI test datafile has 5,290 gaze points associated with a stimulus', function() {
          expect(imotionsStimuli.length).to.equal(5290);
        });
      });

      imotionsNumeric = getNumericPositiveCoordinatesOnly(imotionsStimuli);

      describe('getNumericPositiveCoordinatesOnly()', function() {
        it('real SMI test datafile has 3,218 numeric positive gaze points', function() {
          expect(imotionsNumeric.length).to.equal(3218);
        });
      });

      imotionsFixations = getFixationsOnly(imotionsNumeric);

      describe('getFixationsOnly()', function() {
        it('real SMI test datafile has 155 fixations', function() {
          expect(imotionsFixations.length).to.equal(155);
        });
      });
    });






    describe('Process', function() {
      describe('getAoiId()', function() {
        beforeEach(function () {
          resetDatabase();

          aoiName = faker.lorem.words();
          stimulusId = faker.random.alphaNumeric(17);
          studyId = faker.random.alphaNumeric(17);
          datafileId = faker.random.alphaNumeric(17);

          row = { "aoiName": aoiName };
          aois = [];
          datafile = { "_id": datafileId, "studyId": studyId };
        });

        it('can create a new AOI', function() {
          expect(Aois.find({studyId: studyId}).count()).to.equal(0); //No AOIs exist yet

          aoiId = getAoiId(row, aois, datafile, stimulusId);

          expect(Aois.find({studyId: studyId, stimulusId: stimulusId}).count()).to.equal(1); //Creates a new AOI

          aoi = Aois.findOne({ name: aoiName, studyId: datafile.studyId, stimulusId: stimulusId });
          expect(aoi).to.exist;
          expect(aoi._id).to.equal(aoiId);
        });

        it('can find an existing AOI', function() {
          //Create the "existing" AOI
          Aois.insert({
            name: aoiName,
            studyId: studyId,
            stimulusId: stimulusId,
          });

          aois = Aois.find({studyId: studyId}).fetch();
          aoiId = getAoiId(row, aois, datafile, stimulusId);
          aoi = Aois.findOne({name: aoiName, studyId: datafile.studyId});

          expect(Aois.find({studyId: studyId}).count()).to.equal(1); //Doesn't create a new AOI
          expect(aoi).to.exist;
          expect(aoi._id).to.equal(aoiId);
        });

        it('sets AOI properties', function() {
          aoiId = getAoiId(row, aois, datafile, stimulusId);
          aoi = Aois.findOne({_id: aoiId});
          expect(aoi).to.exist;
          expect(aoi.name).to.equal(aoiName);
          expect(aoi.studyId).to.equal(studyId);
          expect(aoi.stimulusId).to.equal(stimulusId);
        });
      });












      describe('getStimulusId()', function() {
        beforeEach(function () {
          resetDatabase();

          stimulusName = faker.lorem.words();
          studyId = faker.random.alphaNumeric(17);
          datafileId = faker.random.alphaNumeric(17);

          row = { "stimulusName": stimulusName };
          stimuli = [];
          datafile = { "_id": datafileId, "studyId": studyId };
        });

        it('can create a new Stimulus', function() {
          expect(Stimuli.find({studyId: studyId}).count()).to.equal(0); //No Stimuli exist yet

          stimulusId = getStimulusId(row, stimuli, datafile);

          expect(Stimuli.find({studyId: studyId}).count()).to.equal(1); //Creates a new Stimulus

          stimulus = Stimuli.findOne({ name: stimulusName, studyId: datafile.studyId });
          expect(stimulus).to.exist;
          expect(stimulus._id).to.equal(stimulusId);
        });

        it('can find an existing Stimulus', function() {
          //Create the "existing" stimulus
          Stimuli.insert({
            name: stimulusName,
            studyId: studyId,
            datafileIds: [datafileId],
          });

          stimuli = Stimuli.find({studyId: studyId}).fetch();
          stimulusId = getStimulusId(row, stimuli, datafile);
          stimulus = Stimuli.findOne({name: stimulusName, studyId: datafile.studyId});

          expect(Stimuli.find({studyId: studyId}).count()).to.equal(1); //Doesn't create a new AOI
          expect(stimulus).to.exist;
          expect(stimulus._id).to.equal(stimulusId);
        });

        it('sets Stimulus properties', function() {
          stimulusId = getStimulusId(row, aois, datafile);
          stimulus = Stimuli.findOne({_id: stimulusId});
          expect(stimulus).to.exist;
          expect(stimulus.name).to.equal(stimulusName);
          expect(stimulus.studyId).to.equal(studyId);
          expect(stimulus.datafileIds).to.include(datafile._id);
        });
      });
    });
  });
});
