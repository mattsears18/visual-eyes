import Jobs from '../../../collections/Jobs/Jobs';
import makeViewingsByDatafileAoi from './makeViewingsByDatafileAoi';

Meteor.methods({
  'analyses.makeViewings'({ jobId, callback }) {
    console.log('analyses.makeViewings');
    console.log(jobId);

    job = Jobs.getJob(jobId);

    analysis = Analyses.findOne(job.data.analysisId);
    datafile = Datafiles.findOne(job.data.datafileId);
    aoi = Aois.findOne(job.data.aoiId);

    console.log('================================================================================')
    console.log('datafile: ' + datafile.name);
    console.log('================================================================================')
    console.log('aoi: ' + aoi.name);

    indices = '';
    indices = makeViewingsByDatafileAoi(analysis, datafile, aoi);

    if(indices && indices.length) {
      indices.forEach(function(ind) {
        // console.log('start: ' + ind.start + ' end: ' + ind.end);
      });

      job.done();
      callback();
    } else {
      console.log('no viewing indices created');

      job.done();
      callback();
    }
    console.log('job finished');
    console.log('make viewing animations job');
  },
});
