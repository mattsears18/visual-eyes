import { jStat } from 'jStat';

Template.PlotStats.helpers({
  xMin: () => {             return Math.min(...Template.currentData().x); },
  xMax: () => {             return Math.max(...Template.currentData().x); },
  xRange: () => {           return jStat.range(Template.currentData().x); },
  xMean: () => {            return jStat.mean(Template.currentData().x); },
  xMedian: () => {          return jStat.median(Template.currentData().x); },
  xSkewness: () => {        return jStat.skewness(Template.currentData().x); },
  xKurtosis: () => {        return jStat.kurtosis(Template.currentData().x); },
});
