// export default function groupRowsByAoi(assignedRows) {
//   if (Meteor.isServer && !Meteor.isTest) console.log('Datafile.groupRowsByAoi()');

//   if (!assignedRows || !assignedRows.length) {
//     throw Error('noAssignedRows');
//   }

//   const rows = [...assignedRows];
//   const aoiIds = new Set(rows.map(map => map.aoiId));

//   const groups = [];

//   aoiIds.forEach((aoiId) => {
//     const aoiRows = this.filterSortFloat(
//       'timestamp',
//       rows.filter(row => row.aoiId === aoiId),
//     );
//     const { aoiName } = aoiRows[0];
//     const { stimulusId } = aoiRows[0];
//     const { stimulusName } = aoiRows[0];

//     const group = {
//       aoiId,
//       aoiName,
//       stimulusName,
//       stimulusId,
//       rows: aoiRows,
//     };
//     groups.push(group);
//   });

//   // sort by aoiName
//   groups.sort((a, b) => {
//     if (a.aoiName < b.aoiName) {
//       return -1;
//     }
//     if (a.aoiName > b.aoiName) {
//       return 1;
//     }
//     return 0;
//   });

//   return groups;
// }
