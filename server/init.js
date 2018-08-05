import jst from 'jStat'; // can't write import jStat from 'jStat' as it would override the jStat variable on the client and set it to undefined

if (Meteor.isServer){
  jStat = jst.jStat;
}

Meteor.startup(() => {

});
