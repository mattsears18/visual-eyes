Template.Test.onCreated(function() {
  var self = this;
  self.autorun(function() {
    // var genstats = require('genstats');
    //
    // var a1 = [], a2 = []
    // for (var i = 0; i < 10000; i++) {
    //     a1.push(Math.random())
    //     a2.push(Math.random() - 0.05)
    // }
    //
    // console.log('Descriptives')
    //
    // console.log('mean\t\t' + genstats.mean(a1))
    // console.log('variance\t' + genstats.variance(a1))
    // console.log('stdev\t\t' + genstats.stdev(a1))
    // console.log('stdev^2\t\t' + genstats.stdev(a1) * genstats.stdev(a1))
    //
    // console.log('covariance\t' + genstats.covariance(a1, a2))
    // console.log('correlation\t' + genstats.correlation(a1, a2))
    //
    // console.log()
    // console.log('Statistical tests')
    //
    // // Student's t-test
    // console.log('Student\'s t-test', genstats.student(a1, a2))
    //
    // // Welch's t-test (unequal variances)
    // console.log('Welch\'s t-test', genstats.welch(a1, a2))
    //
    // // Wilcoxon test (Mann-Whitney U)
    // console.log('Wilcoxon', genstats.wilcoxon(a1, a2))



    function regress(x, y) {
      const n = y.length;
      let sx = 0;
      let sy = 0;
      let sxy = 0;
      let sxx = 0;
      let syy = 0;
      for (let i = 0; i < n; i++) {
        sx += x[i];
        sy += y[i];
        sxy += x[i] * y[i];
        sxx += x[i] * x[i];
        syy += y[i] * y[i];
      }
      const mx = sx / n;
      const my = sy / n;
      const yy = n * syy - sy * sy;
      const xx = n * sxx - sx * sx;
      const xy = n * sxy - sx * sy;
      const slope = xy / xx;
      const intercept = my - slope * mx;
      const r = xy / Math.sqrt(xx * yy);
      const r2 = Math.pow(r,2);
      let sst = 0;
      for (let i = 0; i < n; i++) {
       sst += Math.pow((y[i] - my), 2);
      }
      const sse = sst - r2 * sst;
      const see = Math.sqrt(sse / (n - 2));
      const ssr = sst - sse;
      return {slope, intercept, r, r2, sse, ssr, sst, sy, sx, see};
    }
    console.log(regress([1, 2, 3, 4, 5], [1, 2, 3, 4, 5]));

  });
});
