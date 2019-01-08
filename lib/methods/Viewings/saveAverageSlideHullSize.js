import Jobs from '../../../collections/Jobs/Jobs';

Meteor.methods({
  'viewings.saveAverageSlideHullSize'({ jobId, callback }) {
    console.log('viewings.saveAverageSlideHullSize');
    console.log('jobId: ' + jobId);

    job = Jobs.getJob(jobId);

    viewing = Viewings.findOne(job.data.viewingId);

    if(!viewing) {
      job.cancel();
    } else {
      slideHulls = Meteor.call('viewings.getSlideHulls', { viewingId: viewing._id}, function(err, slideHulls) {
        if(err) {
          console.log(err);
          job.fail(err);
        } else {
          console.log('slide hulls:');
          // console.log(slideHulls);

          // TODO calculate average hu;ll size
          job.done();
        }
      });
    }

    callback();

    // analysis = Analyses.findOne(job.data.analysisId);
    // datafile = Datafiles.findOne(job.data.datafileId);
    // aoi = Aois.findOne(job.data.aoiId);
    //
    // console.log('================================================================================')
    // console.log('datafile: ' + datafile.name);
    // console.log('================================================================================')
    // console.log('aoi: ' + aoi.name);
    //
    // indices = '';
    // indices = makeViewingsByDatafileAoi(analysis, datafile, aoi);
    //
    // if(indices && indices.length) {
    //   indices.forEach(function(ind) {
    //     // console.log('start: ' + ind.start + ' end: ' + ind.end);
    //   });
    //
    //   job.done();
    //   callback();
    // } else {
    //   console.log('no viewing indices created');
    //
    //   job.done();
    //   callback();
    // }
    // console.log('job finished');
  },
});
