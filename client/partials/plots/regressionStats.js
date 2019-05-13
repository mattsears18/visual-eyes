import { jStat } from 'jStat';

Template.RegressionStats.helpers({
  linearFit: () => helpers.linearEquation(Template.currentData().x, Template.currentData().y),
  slope: () => helpers.linearEquation(Template.currentData().x, Template.currentData().y).equation[0],
  slopeStats: () => 5,
  intercept: () => helpers.linearEquation(Template.currentData().x, Template.currentData().y).equation[1],
  interceptStats: () => 5,
});
