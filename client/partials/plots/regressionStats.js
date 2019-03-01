import { jStat } from 'jStat';

Template.RegressionStats.helpers({
  linearFit: () => {  return helpers.linearEquation(Template.currentData().x, Template.currentData().y); },
  slope: () => {      return helpers.linearEquation(Template.currentData().x, Template.currentData().y).equation[0]; },
  slopeStats: () => { return 5; },
  intercept: () => {  return helpers.linearEquation(Template.currentData().x, Template.currentData().y).equation[1]; },
  interceptStats: () => { return 5; },
});
