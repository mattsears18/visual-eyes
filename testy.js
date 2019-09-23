const visits = Visits.find({ analysisId: 'mZSakkZQE3qvcZnSH' }).fetch();

console.log(visits.length);

const goodGlances = [];
const badGlances = [];

visits.forEach((visit) => {
  console.log(visit.timestamp);
});
