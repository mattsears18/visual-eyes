const visits = Visits.find().fetch();

const total = visits.length;
let count = 0;
visits.forEach((visit) => {
  if (!visit.getGlanceSaccade()) {
    count += 1;
  }
});

console.log(
  `${count} of ${helpers.formatNumber(
    total,
  )} visits have no glance saccade (${helpers.formatNumber(
    (count / total) * 100,
  )}%)`,
);
