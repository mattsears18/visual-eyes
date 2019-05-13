import { jStat } from 'jStat';

Template.HistogramStats.helpers({
  xMin: () => Math.min(...Template.currentData().x),
  xMax: () => Math.max(...Template.currentData().x),
  xRange: () => jStat.range(Template.currentData().x),
  xMean: () => jStat.mean(Template.currentData().x),
  xMedian: () => jStat.median(Template.currentData().x),
  xSkewness: () => jStat.skewness(Template.currentData().x),
  xKurtosis: () => jStat.kurtosis(Template.currentData().x),
});
