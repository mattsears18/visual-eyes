import { makeViewings } from './makeViewings';
import { runCummulativeConvexHull } from './cummulativeConvexHull';
import { runInstantaneousConvexHull } from './instantaneousConvexHull';
import { runCummulativeScanpathLength } from './cummulativeScanpathLength';
import { runInstantaneousScanpathLength } from './instantaneousScanpathLength';
import { runScanpathVelocity } from './scanpathVelocity';

//meteor method called after analysis created
//run each analysis (generate data) in a separate .js file
//all data shows up on the analysis page
//also produce summary stats: # viewings, viewing time,
//combine all data into a single animation

//TODO calculate instantaneous convex hull areas
    //TODO calculate descriptive statistics for instantaneous convex hull areas per viewing (mean, median, min, max, range, histogram)
    //TODO calculate descriptive statistics for instantaneous convex hull areas per participant (mean, median, min, max, range, histogram)
//TODO calculate cummulative convex hull area
    //TODO report time to reach 1%, 2%, 3%, 4%, etc coverage of cummulative convex hull
    //TODO report final convex hull coverage per viewing
    //TODO calculate descriptive statistics for final convex hull coverage per participant (mean, median, min, max, range, histogram)
//TODO report # viewings per participant
//TODO report duration of each viewing
//TODO calculate total viewing time per participant
//TODO calculate total viewing time divided by total experiment time (% of time looking at drawings) per participant
//TODO calculate scanpath length per viewing
//TODO calculate descriptive statistics for scanpath length per participant (mean, median, min, max, range, histogram)
//TODO make the animations
//TODO run stats comparing performance and demographic data to all newly calculated variables (above)
//TODO write journal article explaining the app and any notable findings

////// FUTURE //////////////////////////////////////////////////////////////////
//TODO FUTURE - calculate instantaneous time averaged scanpath velocity
//TODO FUTURE - calculate descriptive statistics for scanpath velocity per participant (mean, median, min, max, range, histogram)
//TODO FUTURE - calculate descriptive statistics for scanpath velocity per viewing (mean, median, histogram)
//TODO FUTURE - review Omar's video files and note the TIME in which participants made rework errors. Draw a vertical line in the animation
                //at each error time, see if any patterns are apparent. Allow users to input "rework error" times.
////////////////////////////////////////////////////////////////////////////////

Meteor.methods({
  'analyses.run'({ analysisId }) {
    //TODO makeViewJobs();
    //TODO makeMetricJobs();


    // viewings = makeViewings(analysisId);
    // analysis = Analyses.findOne(analysisId);
    //
    // if(analysis.analysisTypes.includes('instantaneousConvexHull'))
    //   runInstantaneousConvexHull();
    //
    // if(analysis.analysisTypes.includes('cummulativeConvexHull'))
    //   runCummulativeConvexHull();
    //
    // if(analysis.analysisTypes.includes('instantaneousScanpathLength'))
    //   runInstantaneousScanpathLength();
    //
    // if(analysis.analysisTypes.includes('instantaneousScanpathLength'))
    //   runCummulativeScanpathLength();
    //
    // if(analysis.analysisTypes.includes('scanpathVelocity'))
    //   runScanpathVelocity();
  },
});
