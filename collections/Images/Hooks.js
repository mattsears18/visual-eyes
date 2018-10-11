import Images from './Images';
var sizeOf = require('image-size');

Images.collection.before.insert(function(userId, doc) {
  var dims = sizeOf(doc.path);
  doc.width = dims.width;
  doc.height = dims.height;
});
