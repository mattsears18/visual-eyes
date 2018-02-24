Datafiles = new FS.Collection("datafiles", {
  stores: [new FS.Store.FileSystem("datafiles")]
});

Datafiles.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  // download: function(){
  //   return true;
  // }
});
